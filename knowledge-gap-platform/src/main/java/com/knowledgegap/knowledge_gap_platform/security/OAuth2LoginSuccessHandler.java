package com.knowledgegap.knowledge_gap_platform.security;

import com.knowledgegap.knowledge_gap_platform.dto.AuthenticationResponse;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.GoogleAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final GoogleAuthService googleAuthService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        AuthenticationSuccessHandler.super.onAuthenticationSuccess(request, response, chain, authentication);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String fullName = oauthUser.getAttribute("name");
        String picture = oauthUser.getAttribute("picture");
        String providerId = oauthUser.getName();

        AuthenticationResponse authResponse =
                googleAuthService.googleLogin(
                        email,
                        fullName,
                        providerId,
                        picture
                );

        String redirectUrl =
                "http://localhost:5173/oauth-success"
                        + "?token=" + URLEncoder.encode(authResponse.getToken(), StandardCharsets.UTF_8)
                        + "&role=" + authResponse.getRole()
                        + "&userId=" + authResponse.getUserId()
                        + "&fullName=" + URLEncoder.encode(authResponse.getFullName(), StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }


}
