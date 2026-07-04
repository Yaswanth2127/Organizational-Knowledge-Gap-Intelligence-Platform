package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Role;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.UserRole;
import com.knowledgegap.knowledge_gap_platform.entity.UserRoleId;
import com.knowledgegap.knowledge_gap_platform.repository.RoleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.security.CustomUserDetails;
import com.knowledgegap.knowledge_gap_platform.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

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

        CustomUserDetails userDetails =
                new CustomUserDetails(user, authorities);

        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}