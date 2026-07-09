package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.config.RedisConfig;
import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.OtpRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Role;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.UserRole;
import com.knowledgegap.knowledge_gap_platform.entity.UserRoleId;
import com.knowledgegap.knowledge_gap_platform.model.PendingRegistration;
import com.knowledgegap.knowledge_gap_platform.repository.RoleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.security.CustomUserDetails;
import com.knowledgegap.knowledge_gap_platform.security.JwtService;
import com.knowledgegap.knowledge_gap_platform.util.OtpGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RedisService redisService;
    private final  EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }


        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .emailVerified(false)
                .build();

        userRepository.save(user);

        Role employeeRole = roleRepository.findByName("EMPLOYEE")
                .orElseThrow(() -> new RuntimeException("EMPLOYEE role not found"));

        UserRole userRole = UserRole.builder()
                .id(new UserRoleId(user.getId(), employeeRole.getId()))
                .user(user)
                .role(employeeRole)
                .build();

        userRoleRepository.save(userRole);

        CustomUserDetails userDetails = new CustomUserDetails(
                user,
                List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))
        );

        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .role("EMPLOYEE")
                .userId(user.getId())
                .fullName(user.getFullName())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SimpleGrantedAuthority> authorities =
                userRoleRepository.findByUser(user)
                        .stream()
                        .map(ur -> new SimpleGrantedAuthority("ROLE_" + ur.getRole().getName()))
                        .toList();
        String role = authorities.get(0)
                .getAuthority()
                .replace("ROLE_", "");

        CustomUserDetails userDetails =
                new CustomUserDetails(user, authorities);

        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .role(role)
                .userId(user.getId())
                .fullName(user.getFullName())
                .build();
    }


    public void sendOtp(RegisterRequest request){

        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists ");
        }
        String otp= OtpGenerator.generateOtp();
        PendingRegistration pendingRegistration= PendingRegistration.builder().fullName(request.getFullName())
                .otp(otp)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())).build();

        redisService.savePendingRegistration(pendingRegistration);
        emailService.sendOtp(request.getEmail(), request.getFullName(),otp);

        //return pendingRegistration;
    }

    public AuthenticationResponse verifyOtp(OtpRequest otpRequest) {

        PendingRegistration pendingRegistration =
                redisService.getPendingRegistration(otpRequest.getEmail());

        if (pendingRegistration == null) {
            throw new RuntimeException("OTP expired or not found");
        }

        if (!Objects.equals(otpRequest.getOtp(), pendingRegistration.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        // Create User
        User user = User.builder()
                .fullName(pendingRegistration.getFullName())
                .email(pendingRegistration.getEmail())
                .passwordHash(pendingRegistration.getPassword()) // already encoded
                .isActive(true)
                .emailVerified(true)
                .build();

        userRepository.save(user);

        // Assign EMPLOYEE Role
        Role employeeRole = roleRepository.findByName("EMPLOYEE")
                .orElseThrow(() -> new RuntimeException("EMPLOYEE role not found"));

        UserRole userRole = UserRole.builder()
                .id(new UserRoleId(user.getId(), employeeRole.getId()))
                .user(user)
                .role(employeeRole)
                .build();

        userRoleRepository.save(userRole);

        // Generate JWT
        CustomUserDetails userDetails = new CustomUserDetails(
                user,
                List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))
        );

        String token = jwtService.generateToken(userDetails);

        // Remove pending registration from Redis
        redisService.deletePendingRegistration(user.getEmail());

        return AuthenticationResponse.builder()
                .token(token)
                .role("EMPLOYEE")
                .userId(user.getId())
                .fullName(user.getFullName())
                .build();
    }

    public void resendOtp(String email) {

        PendingRegistration pendingRegistration =
                redisService.getPendingRegistration(email);

        if (pendingRegistration == null) {
            throw new RuntimeException("Registration expired. Please register again.");
        }

        // Generate new OTP
        String otp = OtpGenerator.generateOtp();

        // Update object
        pendingRegistration.setOtp(otp);

        // Save again (TTL resets to 5 minutes)
        redisService.savePendingRegistration(pendingRegistration);

        // Send email
        emailService.sendOtp(email,pendingRegistration.getFullName(), otp);
    }
}