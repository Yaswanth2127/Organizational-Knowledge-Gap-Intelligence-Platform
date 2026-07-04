package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                authenticationService.register(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request) {

        return ResponseEntity.ok(
                authenticationService.authenticate(request)
        );
    }
}