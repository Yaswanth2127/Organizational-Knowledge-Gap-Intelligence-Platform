package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchRequest;
import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchResponse;
import com.knowledgegap.knowledge_gap_platform.entity.MentorshipMatch;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.MentorshipMatchRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.MentorshipMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MentorshipMatchServiceImpl implements MentorshipMatchService {
    private final MentorshipMatchRepository mentorshipMatchRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public MentorshipMatchResponse createMatch(MentorshipMatchRequest request) {
        Optional<MentorshipMatch> existing =
                mentorshipMatchRepository.findByMentorIdAndMenteeIdAndSkillId(
                        request.getMentorId(),
                        request.getMenteeId(),
                        request.getSkillId()
                );

        if(existing.isPresent()){
            throw new RuntimeException("Mentorship already exists");
        }
        User mentor=userRepository.findById(request.getMentorId()).orElseThrow(()->
                new ResourceNotFoundException("Mentor details not found "));

        User mentee=userRepository.findById(request.getMenteeId()).orElseThrow(()->
                new ResourceNotFoundException("Mentee details not found "));

        if(mentor.getId().equals(mentee.getId())){
            throw new IllegalArgumentException("Mentor and mentee cannot be the same.");
        }

        Skill skill=skillRepository.findById(request.getSkillId()).orElseThrow(()->
                new ResourceNotFoundException("Skill details not found "));

        MentorshipMatch mentorshipMatch=MentorshipMatch.builder()
                .mentor(mentor)
                .mentee(mentee)
                .skill(skill)
                .build();

        return mapToMentorshipStatus(mentorshipMatchRepository.save(mentorshipMatch));
    }

    @Override
    public MentorshipMatchResponse updateMatch(Long id, MentorshipMatchRequest request) {
        Optional<MentorshipMatch> existing =
                mentorshipMatchRepository.findByMentorIdAndMenteeIdAndSkillId(
                        request.getMentorId(),
                        request.getMenteeId(),
                        request.getSkillId()
                );

        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            throw new IllegalArgumentException("Mentorship already exists.");
        }

        MentorshipMatch mentorshipMatch=mentorshipMatchRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Mentor ship details are not found "));

        User mentor=userRepository.findById(request.getMentorId()).orElseThrow(()->
                new ResourceNotFoundException("Mentor details not found "));

        User mentee=userRepository.findById(request.getMenteeId()).orElseThrow(()->
                new ResourceNotFoundException("Mentee details not found "));

        if(mentor.getId().equals(mentee.getId())){
            throw new IllegalArgumentException("Mentor and mentee cannot be the same.");
        }

        Skill skill=skillRepository.findById(request.getSkillId()).orElseThrow(()->
                new ResourceNotFoundException("Skill details not found "));



       mentorshipMatch.setMentor(mentor);
       mentorshipMatch.setMentee(mentee);
       mentorshipMatch.setSkill(skill);

        return mapToMentorshipStatus(mentorshipMatchRepository.save(mentorshipMatch));

    }

    @Override
    public void deleteMatch(Long id) {
        if(!mentorshipMatchRepository.existsById(id)){
            throw new ResourceNotFoundException("Mentor ship details not found ");
        }
        mentorshipMatchRepository.deleteById(id);

    }

    @Override
    public MentorshipMatchResponse getMatchById(Long id) {
        MentorshipMatch mentorshipMatch=mentorshipMatchRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Mentor ship details are not found "));
        return mapToMentorshipStatus(mentorshipMatch);
    }

    @Override
    public List<MentorshipMatchResponse> getMatchesByMentor(Long mentorId) {

        return mentorshipMatchRepository.findByMentorId(mentorId)
                .stream().map(this::mapToMentorshipStatus).toList();
    }

    @Override
    public List<MentorshipMatchResponse> getMatchesByMentee(Long menteeId) {
        return mentorshipMatchRepository.findByMenteeId(menteeId).
                stream().map(this::mapToMentorshipStatus).toList();
    }

    @Override
    public List<MentorshipMatchResponse> getMatchesBySkill(Long skillId) {
        return mentorshipMatchRepository.findBySkillId(skillId).
                stream().map(this::mapToMentorshipStatus).toList();
    }

    @Override
    public List<MentorshipMatchResponse> getMatchesByStatus(MentorshipStatus status) {
        return mentorshipMatchRepository.findByStatus(status).
                stream().map(this::mapToMentorshipStatus).toList();
    }
    private MentorshipMatchResponse mapToMentorshipStatus(MentorshipMatch mentorshipMatch){
        return MentorshipMatchResponse.builder()
                .id(mentorshipMatch.getId())
                .mentorId(mentorshipMatch.getMentor().getId())
                .mentorName(mentorshipMatch.getMentor().getFullName())
                .menteeId(mentorshipMatch.getMentee().getId())
                .menteeName(mentorshipMatch.getMentee().getFullName())
                .skillId(mentorshipMatch.getSkill().getId())
                .skillName(mentorshipMatch.getSkill().getName())
                .matchedAt(mentorshipMatch.getMatchedAt())
                .endedAt(mentorshipMatch.getEndedAt())
                .createdAt(mentorshipMatch.getCreatedAt())
                .updatedAt(mentorshipMatch.getUpdatedAt())
                .status(mentorshipMatch.getStatus())
                .build();
    }
}
