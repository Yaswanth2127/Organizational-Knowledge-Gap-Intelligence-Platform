package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationResponse;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.repository.RoleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.security.CustomUserDetails;
import com.knowledgegap.knowledge_gap_platform.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {
    private  final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    public AuthenticationResponse googleLogin(
            String email, String fullName, String providerId, String profileImageUrl){
        User user=userRepository.findByEmail(email).orElse(null);

        if(user==null){
            user = User.builder()
                    .fullName(fullName)
                    .email(email)
                    .passwordHash(null)
                    .authProvider(AuthProvider.GOOGLE)// already encoded
                    .isActive(true)
                    .build();

            userRepository.save(user);
            //assign employee role
            assignEmployeeRole(user);
        }
        user.setProfileImageUrl(profileImageUrl);
        user.setAuthProvider(AuthProvider.GOOGLE);
        user.setEmailVerified(true);
        user.setProviderId(providerId);
        userRepository.save(user);

        return buildAuthenticationResponse(user);

    }

    private AuthenticationResponse buildAuthenticationResponse(User user){
        List<SimpleGrantedAuthority> authorities =
                userRoleRepository.findByUserId(user.getId())
                        .stream()
                        .map(ur -> new SimpleGrantedAuthority(
                                "ROLE_" + ur.getRole().getName()
                        ))
                        .toList();

        List<String> roles = authorities.stream()
                .map(authority ->
                        authority.getAuthority().replace("ROLE_", "")
                )
                .toList();

        String token = jwtService.generateToken(
                new CustomUserDetails(user, authorities)
        );

        return AuthenticationResponse.builder()
                .token(token)
                .roles(roles)
                .userId(user.getId())
                .fullName(user.getFullName())
                .build();
    }
    private void assignEmployeeRole(User user){
        Role employeeRole = roleRepository.findByName("EMPLOYEE")
                .orElseThrow(() -> new RuntimeException("EMPLOYEE role not found"));

        UserRole userRole = UserRole.builder()
                .id(new UserRoleId(user.getId(), employeeRole.getId()))
                .user(user)
                .role(employeeRole)
                .build();

        userRoleRepository.save(userRole);


    }
}
