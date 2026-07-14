package com.knowledgegap.knowledge_gap_platform.security;
import org.springframework.context.annotation.Lazy;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;
    private final @Lazy OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                 .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers( "/api/auth/**",
                                "/oauth2/**",
                                "/login/**").permitAll()

                        // Admin only
                        .requestMatchers("/api/admin/**")
                        .hasRole("SYS_ADMIN")

                        // Admin and HR
                        .requestMatchers("/api/hr/**")
                        .hasAnyRole("SYS_ADMIN", "HR_SPECIALIST")

                        // Employee, HR and Admin
                       .requestMatchers("/api/users/**")
                       .hasAnyRole("SYS_ADMIN", "HR_SPECIALIST", "EMPLOYEE")

                       .requestMatchers("/api/employee-skills/**")
                       .hasAnyRole("EMPLOYEE","HR_SPECIALIST","SYS_ADMIN")

                       .requestMatchers("/api/certifications/**")
                       .hasAnyRole("EMPLOYEE","HR_SPECIALIST","SYS_ADMIN")

                        // Everything else requires login
                        .anyRequest()
                        .authenticated()
                )

                .userDetailsService(customUserDetailsService)
                .oauth2Login(oauth -> oauth
                .successHandler(oAuth2LoginSuccessHandler)
        )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}