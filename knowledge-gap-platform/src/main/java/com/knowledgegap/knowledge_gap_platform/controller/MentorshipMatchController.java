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
@CrossOrigin("*")
public class MentorshipMatchController {

    private final MentorshipMatchService mentorshipMatchService;


    // =========================================================
    // ADMIN - GET ALL MATCHES
    // =========================================================

    @GetMapping("/all")
    public ResponseEntity<List<MentorshipMatchResponse>> getAllMatches() {

        return ResponseEntity.ok(
                mentorshipMatchService.getAllMatches()
        );
    }


    // =========================================================
    // CREATE
    // =========================================================

    @PostMapping
    public ResponseEntity<MentorshipMatchResponse> createMatch(
            @Valid @RequestBody MentorshipMatchRequest request) {

        return new ResponseEntity<>(
                mentorshipMatchService.createMatch(request),
                HttpStatus.CREATED
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<MentorshipMatchResponse> updateMatch(
            @PathVariable Long id,
            @Valid @RequestBody MentorshipMatchRequest request) {

        return ResponseEntity.ok(
                mentorshipMatchService.updateMatch(id, request)
        );
    }


    // =========================================================
    // DELETE
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMatch(
            @PathVariable Long id) {

        mentorshipMatchService.deleteMatch(id);

        return ResponseEntity.ok(
                "Mentorship Match deleted successfully."
        );
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<MentorshipMatchResponse> getMatchById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchById(id)
        );
    }


    // =========================================================
    // GET BY MENTOR
    // =========================================================

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<MentorshipMatchResponse>>
    getMatchesByMentor(
            @PathVariable Long mentorId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByMentor(mentorId)
        );
    }


    // =========================================================
    // GET BY MENTEE
    // =========================================================

    @GetMapping("/mentee/{menteeId}")
    public ResponseEntity<List<MentorshipMatchResponse>>
    getMatchesByMentee(
            @PathVariable Long menteeId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByMentee(menteeId)
        );
    }


    // =========================================================
    // GET BY SKILL
    // =========================================================

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<MentorshipMatchResponse>>
    getMatchesBySkill(
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesBySkill(skillId)
        );
    }


    // =========================================================
    // GET BY STATUS
    // =========================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MentorshipMatchResponse>>
    getMatchesByStatus(
            @PathVariable MentorshipStatus status) {

        return ResponseEntity.ok(
                mentorshipMatchService.getMatchesByStatus(status)
        );
    }


    // =========================================================
    // ACCEPT
    // =========================================================

    @PostMapping("/{id}/accept")
    public ResponseEntity<MentorshipMatchResponse> acceptMatch(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mentorshipMatchService.acceptMatch(id)
        );
    }


    // =========================================================
    // COMPLETE
    // =========================================================

    @PostMapping("/{id}/complete")
    public ResponseEntity<MentorshipMatchResponse> completeMatch(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mentorshipMatchService.completeMatch(id)
        );
    }


    // =========================================================
    // CANCEL
    // =========================================================

    @PostMapping("/{id}/cancel")
    public ResponseEntity<MentorshipMatchResponse> cancelMatch(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mentorshipMatchService.cancelMatch(id)
        );
    }
}