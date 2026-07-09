package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.*;
import com.knowledgegap.knowledge_gap_platform.model.PendingRegistration;
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


//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody RegisterRequest request) {
//
//        return ResponseEntity.ok(
//                authenticationService.register(request)
//        );
//    }

    @PostMapping("/send-otp")
    public ResponseEntity<OtpResponse> sendOtp(
            @RequestBody RegisterRequest request) {

       authenticationService.sendOtp(request);
       return ResponseEntity.ok(new OtpResponse("OTP sent successfully") );
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<OtpResponse> verifyOtp(@RequestBody OtpRequest otpRequest){

        authenticationService.verifyOtp(otpRequest);
        return ResponseEntity.ok(new OtpResponse("Account created successfully. Please login."));

    }

    @PostMapping("/resend-otp")
    public ResponseEntity<OtpResponse> resendOtp(
            @RequestBody ResendOtpRequest request) {

        authenticationService.resendOtp(request.getEmail());

        return ResponseEntity.ok(
                new OtpResponse("OTP resent successfully")
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