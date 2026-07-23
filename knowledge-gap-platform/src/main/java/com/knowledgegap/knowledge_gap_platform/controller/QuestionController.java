package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.QuestionResponse;
import com.knowledgegap.knowledge_gap_platform.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/assessment/{assessmentId}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByAssessment(
            @PathVariable Long assessmentId) {

        return ResponseEntity.ok(
                questionService.getQuestionsByAssessment(assessmentId)
        );
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionResponse> getQuestionById(
            @PathVariable Long questionId) {

        return ResponseEntity.ok(
                questionService.getQuestionById(questionId)
        );
    }
}
