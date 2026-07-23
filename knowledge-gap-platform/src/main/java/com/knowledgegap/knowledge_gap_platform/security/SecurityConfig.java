package com.knowledgegap.knowledge_gap_platform.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
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

                        // ==========================
                        // PUBLIC ENDPOINTS
                        // ==========================
                        .requestMatchers(
                                "/api/auth/**",
                                "/oauth2/**",
                                "/api/ai/**",
                                "/api/assessments/**",
                                "/api/questions/**",
                                "/login/**",

                                // Swagger
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml"
                        ).permitAll()

                        // ==========================
                        // SYS ADMIN
                        // ==========================
                        .requestMatchers("/api/admin/**")
                        .hasRole("SYS_ADMIN")

                        // ==========================
                        // HR + SYS ADMIN
                        // ==========================
                        .requestMatchers("/api/hr/**")
                        .hasAnyRole("SYS_ADMIN", "HR_SPECIALIST")

                        // ==========================
                        // USERS
                        // ==========================
                        .requestMatchers("/api/users/**")
                        .hasAnyRole(
                                "SYS_ADMIN",
                                "HR_SPECIALIST",
                                "EMPLOYEE"
                        )

                        // ==========================
                        // EMPLOYEE SKILLS
                        // ==========================
                        .requestMatchers("/api/employee-skills/**")
                        .hasAnyRole(
                                "EMPLOYEE",
                                "HR_SPECIALIST",
                                "SYS_ADMIN"
                        )

                        // ==========================
                        // CERTIFICATIONS
                        // ==========================
                        .requestMatchers("/api/certifications/**")
                        .hasAnyRole(
                                "EMPLOYEE",
                                "HR_SPECIALIST",
                                "SYS_ADMIN"
                        )

                        .requestMatchers("/api/courses/**")
                        .hasAnyRole(
                                "EMPLOYEE", 
                                "MANAGER",
                                "HR_SPECIALIST", 
                                "LND_ADMIN", 
                                "SYS_ADMIN"
                        )

                        .requestMatchers("/api/learning-paths/**")
                        .hasAnyRole(
                                "EMPLOYEE",
                                "HR_SPECIALIST",
                                "LND_ADMIN",
                                "SYS_ADMIN"
                        )

                        .requestMatchers("/api/enrollments/**")
                        .hasAnyRole(
                                "EMPLOYEE",
                                "HR_SPECIALIST",
                                "LND_ADMIN",
                                "SYS_ADMIN"
                        )

                        .requestMatchers("/api/learning-path-courses/**")
                        .hasAnyRole(
                               "EMPLOYEE",
                               "HR_SPECIALIST",
                               "LND_ADMIN",
                               "SYS_ADMIN"
                        )

                        // ==========================
                        // EVERYTHING ELSE
                        // ==========================
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