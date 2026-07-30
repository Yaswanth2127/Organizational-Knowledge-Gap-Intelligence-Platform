package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchRequest;
import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;

import java.util.List;

public interface MentorshipMatchService {
    MentorshipMatchResponse createMatch(MentorshipMatchRequest request);

    MentorshipMatchResponse updateMatch(Long id, MentorshipMatchRequest request);

    void deleteMatch(Long id);

    MentorshipMatchResponse getMatchById(Long id);

    List<MentorshipMatchResponse> getMatchesByMentor(Long mentorId);

    List<MentorshipMatchResponse> getMatchesByMentee(Long menteeId);

    List<MentorshipMatchResponse> getMatchesBySkill(Long skillId);

    List<MentorshipMatchResponse> getMatchesByStatus(MentorshipStatus status);
}
