package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.*;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;

import com.knowledgegap.knowledge_gap_platform.exception.AIException;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.*;
import com.knowledgegap.knowledge_gap_platform.service.AIService;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentService;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final QuestionRepository questionRepository;
    private final EmployeeAnswerRepository employeeAnswerRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final SkillGapService skillGapService;
    private final SkillGapRepository skillGapRepository;
    private final AIService aiService;

    @Override
    public AssessmentResponse createAssessment(AssessmentCreateRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));


        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        SkillGap gap = skillGapRepository
                .findByUserAndSkill(user, skill)
                .orElseThrow(() -> new ResourceNotFoundException("Skill gap not found"));

        Double gapScore = gap.getGapScore() != null
                ? gap.getGapScore().doubleValue()
                : null;
        GeneratedAssessment generatedAssessment=aiService.generateAssessment(
                new AssessmentPromptData(skill.getName(),gap.getCurrentLevel(),gap.getRequiredLevel(),gapScore,gap.getSeverity()));


        if (generatedAssessment == null ||
                generatedAssessment.getQuestions() == null ||
                generatedAssessment.getQuestions().isEmpty()) {

            throw new AIException("AI failed to generate assessment.");
        }
        if (generatedAssessment.getQuestions().size() != 10) {
            throw new AIException("Expected 10 questions.");
        }
        boolean exists= assessmentRepository.existsByUserAndSkillAndStatus(user,skill,AssessmentStatus.PENDING);
        if(exists){
            throw new IllegalStateException("Pending assessment already exists ");
        }
        Assessment assessment = Assessment.builder()
                .user(user)
                .skill(skill)
                .title(generatedAssessment.getTitle())
                .passed(false)
                .status(AssessmentStatus.PENDING)
                .targetLevel(gap.getRequiredLevel())
                .build();
        assessment=assessmentRepository.save(assessment);

        List<Question> questions = new ArrayList<>();


        int order=1;
        for(GeneratedQuestion question:generatedAssessment.getQuestions()){
            Question q=Question.builder()
                    .question(question.getQuestion())
                    .optionA(question.getOptionA())
                    .optionB(question.getOptionB())
                    .optionC(question.getOptionC())
                    .optionD(question.getOptionD())
                    .correctAnswer(question.getCorrectAnswer())
                    .questionOrder(order++)
                    .assessment(assessment)
                    .build();

            questions.add(q);
        }
        questionRepository.saveAll(questions);

        return mapToResponse(assessment);
    }

    @Override
    public AssessmentResponse submitAssessment(AssessmentSubmitRequest request) {

        Assessment assessment=assessmentRepository.findById(request.getAssessmentId()).orElseThrow(()->
                new ResourceNotFoundException("Assessment not found "));

        BigDecimal res=evaluateAndSaveAnswers(request.getAnswers(),assessment);

        assessment.setScore(res);
        Boolean passed=res.compareTo(assessment.getPassingScore())>=0;
        assessment.setPassed(passed);
        assessment.setStatus(passed? AssessmentStatus.PASSED:AssessmentStatus.FAILED);



        return mapToResponse(assessmentRepository.save(assessment));
    }

    @Override
    public AssessmentResponse approveAssessment(AssessmentApprovalRequest request) {
        Assessment assessment = assessmentRepository.findById(request.getAssessmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found"));

        // Only completed assessments can be approved/rejected
        if (assessment.getStatus() != AssessmentStatus.PASSED &&
                assessment.getStatus() != AssessmentStatus.FAILED) {
            throw new IllegalStateException("Assessment is not ready for approval");
        }


        SkillGap gap = skillGapRepository
                .findByUserAndSkill(assessment.getUser(), assessment.getSkill()).orElseThrow(
                        ()->new ResourceNotFoundException("Skill gaps not found")
                );

        // Get logged-in manager
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found"));

        if (!assessment.getUser().getManager().getId().equals(manager.getId())) {
            throw new AccessDeniedException("You are not authorized to approve this assessment.");
        }

        if (assessment.getStatus() == AssessmentStatus.APPROVED ||
                assessment.getStatus() == AssessmentStatus.REJECTED) {

            throw new IllegalStateException("Assessment has already been reviewed.");
        }
        assessment.setApprovedBy(manager);
        assessment.setApprovedAt(LocalDateTime.now());
        assessment.setRemarks(request.getRemarks());

        if (request.getApproved()) {
            assessment.setStatus(AssessmentStatus.APPROVED);
            EmployeeSkill employeeSkill=employeeSkillRepository.findByUserIdAndSkill(assessment.getUser().getId(),assessment.getSkill())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee skill not found"));
            employeeSkill.setManagerRating(gap.getRequiredLevel());
            employeeSkillRepository.save(employeeSkill);
            // TODO:
            // 1. Update EmployeeSkill level
            // 2. Re-run Gap Analysis

        } else {
            assessment.setStatus(AssessmentStatus.REJECTED);
        }
        assessment=assessmentRepository.save(assessment);
        if(request.getApproved()){
            skillGapService.analyzeSkillGap(new SkillGapRequest(assessment.getUser().getId()));
        }

        return mapToResponse(assessment);

    }

    @Override
    public AssessmentResponse getAssessmentById(Long id) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));

        return mapToResponse(assessment);
    }

    @Override
    public List<AssessmentResponse> getAllAssessments() {

        return assessmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentResponse> getAssessmentsByUserId(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return assessmentRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }



    @Override
    public List<AssessmentResponse> getAssessmentsBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        return assessmentRepository.findBySkill(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentResponse> getPendingAssessments() {
        return assessmentRepository.findByStatus(AssessmentStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<AssessmentResponse> getPendingApprovals() {
        return assessmentRepository
                .findByStatusIn(List.of(
                        AssessmentStatus.PASSED,
                        AssessmentStatus.FAILED))
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<AssessmentResponse> getAssessmentHistoryByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return assessmentRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }


    private AssessmentResponse mapToResponse(Assessment assessment) {

        return AssessmentResponse.builder()
                .id(assessment.getId())

                .userId(assessment.getUser().getId())
                .userName(assessment.getUser().getFullName())

                .skillId(assessment.getSkill().getId())
                .skillName(assessment.getSkill().getName())

                .title(assessment.getTitle())

                .score(assessment.getScore())
                .passingScore(assessment.getPassingScore())
                .passed(assessment.getPassed())

                .status(assessment.getStatus())


                .approvedById(
                        assessment.getApprovedBy() != null
                                ? assessment.getApprovedBy().getId()
                                : null
                )
                .approvedByName(
                        assessment.getApprovedBy() != null
                                ? assessment.getApprovedBy().getFullName()
                                : null
                )

                .assessedAt(assessment.getAssessedAt())
                .approvedAt(assessment.getApprovedAt())
                .remarks(assessment.getRemarks())

                .build();
    }

    private BigDecimal evaluateAndSaveAnswers(List<QuestionAnswerRequest> answerRequests,Assessment assessment){
        BigDecimal score=BigDecimal.ZERO;

        if (employeeAnswerRepository.existsByAssessmentId(assessment.getId())) {
            throw new IllegalStateException("Assessment already submitted");
        }
        List<Question> questions =
                questionRepository.findByAssessmentIdOrderByQuestionOrder(assessment.getId());

        Set<Long> ids =
                answerRequests.stream()
                        .map(QuestionAnswerRequest::getQuestionId)
                        .collect(Collectors.toSet());

        if (ids.size() != answerRequests.size()) {
            throw new IllegalArgumentException("All questions must be answered");
        }
        Map<Long, Question> questionMap =
                questions.stream()
                        .collect(Collectors.toMap(Question::getId, Function.identity()));


        List<EmployeeAnswer> employeeAnswers=new ArrayList<>();
        for(QuestionAnswerRequest answer:answerRequests){
            Question q=questionMap.get(answer.getQuestionId());
            if(q==null){
                throw new ResourceNotFoundException("Question not found");
            }

            if (!q.getAssessment().getId().equals(assessment.getId())) {
                throw new IllegalArgumentException("Question does not belong to this assessment");
            }

            EmployeeAnswer employeeAnswer = EmployeeAnswer.builder()
                    .assessment(assessment)
                    .question(q)
                    .selectedAnswer(answer.getSelectedAnswer())
                    .correct(answer.getSelectedAnswer() != null
                            && q.getCorrectAnswer().equals(answer.getSelectedAnswer()))
                    .build();

            if(answer.getSelectedAnswer() !=null &&q.getCorrectAnswer().equals(answer.getSelectedAnswer())){
               score= score.add(BigDecimal.ONE);
            }

            employeeAnswers.add(employeeAnswer);
        }
        employeeAnswerRepository.saveAll(employeeAnswers);


        return score
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(answerRequests.size()), 2, RoundingMode.HALF_UP);
    }
}