package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentResponse;
import com.knowledgegap.knowledge_gap_platform.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<EnrollmentResponse> enroll(
            @Valid @RequestBody EnrollmentRequest request) {

        return new ResponseEntity<>(
                enrollmentService.enroll(request),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody EnrollmentRequest request) {

        return ResponseEntity.ok(
                enrollmentService.update(id, request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                enrollmentService.getById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentResponse>> getAll() {

        return ResponseEntity.ok(
                enrollmentService.getAll()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        enrollmentService.delete(id);

        return ResponseEntity.ok("Enrollment deleted successfully.");
    }
}