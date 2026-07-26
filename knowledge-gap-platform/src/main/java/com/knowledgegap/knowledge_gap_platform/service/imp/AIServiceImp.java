package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.knowledgegap.knowledge_gap_platform.client.GeminiClient;
import com.knowledgegap.knowledge_gap_platform.dto.*;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationResponse;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentPromptData;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.GeneratedAssessment;
import com.knowledgegap.knowledge_gap_platform.dto.gemini.GeminiRecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.gemini.GeminiRecommendedCourse;
import com.knowledgegap.knowledge_gap_platform.dto.gemini.GeminiSkillRecommendation;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.RecommendationSource;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.*;
import com.knowledgegap.knowledge_gap_platform.service.AIService;
import com.knowledgegap.knowledge_gap_platform.service.CourseService;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import com.knowledgegap.knowledge_gap_platform.util.PromptBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AIServiceImp implements AIService {
    private final UserRepository userRepository;
    private final SkillGapRepository skillGapRepository;
    private final PromptBuilder promptBuilder;
    private final CourseRepository courseRepository;
    private  final GeminiClient geminiClient;
    private final ObjectMapper objectMapper;
    private final CourseService courseService;
    private final LearningPathRepository learningPathRepository;
    private final RecommendationRepository recommendationRepository;
    private final SkillGapService skillGapService;

    @Override
    public AIRecommendationResponse generateRecommendation(AIRecommendationRequest aiRecommendationRequest) {
        User user=userRepository.findById(aiRecommendationRequest.getUserId()).orElseThrow(()->
                new ResourceNotFoundException("User Details not found "));

        List<SkillGap> skillGaps =
                skillGapRepository.findByUserIdAndStatus(user.getId(),GapStatus.OPEN);

        Map<String, SkillGap> skillGapMap = skillGaps.stream()
                .collect(Collectors.toMap(
                        gap -> gap.getSkill().getName().trim().toLowerCase(),
                        Function.identity()
                ));

        if (skillGaps.isEmpty()) {
            return AIRecommendationResponse.builder()
                    .summary("No skill gaps found. The employee currently meets the required competency levels.")
                    .recommendations(Collections.emptyList())
                    .build();
        }

        Map<SkillGap ,List<Course>> skillGapCourses=new LinkedHashMap<>();
        for(SkillGap gap:skillGaps){
            List<Course> courses=courseRepository.findBySkillId(gap.getSkill().getId());
            skillGapCourses.put(gap,courses);
        }
        String prompt=promptBuilder.BuildRecommendationPrompt(user,skillGapCourses);


        String aiResponse=geminiClient.generateContent(prompt);

        GeminiRecommendationResponse geminiResponse;

        try{
            geminiResponse=objectMapper.readValue(aiResponse, GeminiRecommendationResponse.class);
        }catch (JsonProcessingException e){
            throw new RuntimeException("Failed to parse Gemini Response ");
        }

        // Delete old recommendations
        recommendationRepository.deleteByUserId(user.getId());

        //archive learning path
        learningPathRepository.archiveActiveLearningPathsByUserId(user.getId());

        LearningPath learningPath=LearningPath.builder()
                .user(user)
                .status(LearningPathStatus.ACTIVE)
                .generatedBy(RecommendationSource.AI)
                .summary(geminiResponse.getSummary())
                .build();

        learningPath=learningPathRepository.save(learningPath);

        AIRecommendationResponse response = new AIRecommendationResponse();

        List<SkillRecommendationResponse> skillResponses = new ArrayList<>();


        for(GeminiSkillRecommendation gemini:geminiResponse.getRecommendations()){


            SkillGap skillGap = skillGapMap.get(
                    gemini.getSkillName().trim().toLowerCase()
            );

            if (skillGap == null) {
                throw new ResourceNotFoundException(
                        "SkillGap not found for skill: " + gemini.getSkillName()
                );
            }
            SkillRecommendationResponse skillRecommendationResponse=new SkillRecommendationResponse();
            List<RecommendedCourseResponse> courseResponses=new ArrayList<>();

            for(GeminiRecommendedCourse course:gemini.getCourses()){
                Long courseId =course.getCourseId();

                if(courseId==null){
                    Optional<Course> existingCourse =
                            courseRepository.findByTitleAndProvider(
                                    course.getTitle(),
                                    course.getProvider()
                            );

                    if (existingCourse.isPresent()) {
                        courseId = existingCourse.get().getId();
                    } else {
                        CourseResponse course1 =
                                courseService.createCourse(mapToCourseRequest(course, skillGap));
                        courseId = course1.getId();
                    }

                }


                Course courseEntity = courseRepository.findById(courseId)
                        .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

                courseResponses.add(mapToRecommendedCourseResponse(course,courseEntity));



                Recommendation recommendation = Recommendation.builder()
                        .learningPath(learningPath)
                        .user(user)
                        .skillGap(skillGap)
                        .course(courseEntity)
                        .reason(course.getReason())
                        .relevanceScore(course.getRelevanceScore())
                        .accepted(false)
                        .build();

                recommendationRepository.save(recommendation);

            }

            skillRecommendationResponse.setSkillName(gemini.getSkillName());
            skillRecommendationResponse.setCourses(courseResponses);
            //skillRecommendationResponse.setSkillGapId(gemini.getSkillGapId());

            skillResponses.add(skillRecommendationResponse);
        }
        response.setRecommendations(skillResponses);
        response.setSummary(geminiResponse.getSummary());

        return response;
    }

    @Override
    public GeneratedAssessment generateAssessment(AssessmentPromptData data) {
        try {

            String prompt = promptBuilder.buildAssessmentPrompt(data);

            String response = geminiClient.generateContent(prompt);
            System.out.println("Gemini Response:");
            System.out.println(response);

            return objectMapper.readValue(response, GeneratedAssessment.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            System.out.println(e);
            throw new RuntimeException("Failed to parse Gemini assessment response.", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate assessment.", e);
        }

    }

    private CourseRequest mapToCourseRequest(GeminiRecommendedCourse course,SkillGap skillGap){

         return  CourseRequest.builder()
                .title(course.getTitle())
                .difficulty(null)
                .durationHours(null)
                .externalUrl(course.getExternalUrl())
                .provider(course.getProvider())
                .source(course.getSource())
                .description(null)
                 .skillId(skillGap.getSkill().getId())
        .build();
    }
    private CourseResponse mapToCourseResponse(Course course){
        return CourseResponse.builder().id(course.getId())
                .externalUrl(course.getExternalUrl())
                .provider(course.getProvider())
                .title(course.getTitle())
                .source(course.getSource())
                .description(course.getDescription())
                .difficulty(course.getDifficulty())
                .durationHours(course.getDurationHours())
                .skillId(course.getSkill().getId())
                .skillName(course.getSkill().getName())
                .thumbnailUrl(course.getThumbnailUrl())
                .createdAt(course.getCreatedAt())
                .build();
    }
    private RecommendedCourseResponse mapToRecommendedCourseResponse(GeminiRecommendedCourse course,Course course1){


        return RecommendedCourseResponse.builder()
                .course(mapToCourseResponse(course1))
                .sequenceOrder(course.getSequenceOrder())
                .reason(course.getReason())
                .relevanceScore(course.getRelevanceScore())
                .build();
    }
}
