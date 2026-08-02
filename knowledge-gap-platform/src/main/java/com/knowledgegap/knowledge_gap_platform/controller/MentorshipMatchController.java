package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchRequest;
import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import com.knowledgegap.knowledge_gap_platform.service.MentorshipMatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship-matches")
@RequiredArgsConstructor
public class MentorshipMatchController {

    private final MentorshipMatchService mentorshipMatchService;

    // Create Match
    @PostMapping
    public ResponseEntity<MentorshipMatchResponse> createMatch(
            @Valid @RequestBody MentorshipMatchRequest request) {

        return new ResponseEntity<>(
                mentorshipMatchService.createMatch(request),
                HttpStatus.CREATED
        );
    }

    // Update Match
    @PutMapping("/{id}")
    public ResponseEntity<MentorshipMatchResponse> updateMatch(
            @PathVariable Long id,
            @Valid @RequestBody MentorshipMatchRequest request) {

        return ResponseEntity.ok(
                mentorshipMatchService.updateMatch(id, request)
        );
    }

    // Delete Match
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMatch(
            @PathVariable Long id) {

        mentorshipMatchService.deleteMatch(id);

        return ResponseEntity.ok("Mentorship Match deleted successfully.");
    }

    // Get Match By Id
    @GetMapping("/{id}")
    public ResponseEntity<MentorshipMatchResponse> getMatchById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchById(id)
        );
    }

    // Get Matches By Mentor
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<MentorshipMatchResponse>> getMatchesByMentor(
            @PathVariable Long mentorId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByMentor(mentorId)
        );
    }

    // Get Matches By Mentee
    @GetMapping("/mentee/{menteeId}")
    public ResponseEntity<List<MentorshipMatchResponse>> getMatchesByMentee(
            @PathVariable Long menteeId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByMentee(menteeId)
        );
    }

    // Get Matches By Skill
    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<MentorshipMatchResponse>> getMatchesBySkill(
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesBySkill(skillId)
        );
    }

    // Get Matches By Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<MentorshipMatchResponse>> getMatchesByStatus(
            @PathVariable MentorshipStatus status) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByStatus(status)
        );
    }
}