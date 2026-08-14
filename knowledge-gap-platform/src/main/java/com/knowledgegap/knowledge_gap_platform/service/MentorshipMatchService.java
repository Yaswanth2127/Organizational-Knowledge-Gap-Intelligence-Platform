package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchRequest;
import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;

import java.util.List;

public interface MentorshipMatchService {
    // Create
    MentorshipMatchResponse createMatch(
            MentorshipMatchRequest request
    );

    // Update
    MentorshipMatchResponse updateMatch(
            Long id,
            MentorshipMatchRequest request
    );

    // Delete
    void deleteMatch(Long id);

    // Get by ID
    MentorshipMatchResponse getMatchById(Long id);

    // Get by mentor
    List<MentorshipMatchResponse> getMatchesByMentor(
            Long mentorId
    );

    // Get by mentee
    List<MentorshipMatchResponse> getMatchesByMentee(
            Long menteeId
    );

    // Get by skill
    List<MentorshipMatchResponse> getMatchesBySkill(
            Long skillId
    );

    // Get by status
    List<MentorshipMatchResponse> getMatchesByStatus(
            MentorshipStatus status
    );

    // Get all - Admin
    List<MentorshipMatchResponse> getAllMatches();

    // Mentorship lifecycle
    MentorshipMatchResponse acceptMatch(Long id);

    MentorshipMatchResponse completeMatch(Long id);

    MentorshipMatchResponse cancelMatch(Long id);
}
