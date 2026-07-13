package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.UpdateProfileRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;
import com.knowledgegap.knowledge_gap_platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    // ==========================
    // HR / System Admin
    // ==========================

    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(userService.getAllUsers());

    }

    // ==========================
    // Employee / HR / Admin
    // ==========================

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(userService.getUser(id));

    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request) {

        return ResponseEntity.ok(
                userService.updateUser(id, request)
        );

    }

    // ==========================
    // System Admin Only
    // ==========================

    @PreAuthorize("hasRole('SYS_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        userService.delete(id);

        return ResponseEntity.noContent().build();

    }

    // ==========================
    // Recent Users
    // ==========================

    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
    @GetMapping("/recent")
    public ResponseEntity<List<UserResponse>> latestUsers() {

        return ResponseEntity.ok(
                userService.findLast7ByCreatedAtDesc()
        );

    }

}