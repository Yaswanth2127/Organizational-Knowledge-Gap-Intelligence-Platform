package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.config.RedisConfig;
import com.knowledgegap.knowledge_gap_platform.dto.*;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.model.PasswordResetRequest;
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
    private final PasswordRedisService passwordRedisService;

    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .authProvider(AuthProvider.LOCAL)
                .emailVerified(false)
                .build();

        userRepository.save(user);

        //assign employee role
        assignEmployeeRole(user);


        return buildAuthenticationResponse(user);
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



        return buildAuthenticationResponse(user);
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
                .passwordHash(pendingRegistration.getPassword())
                .authProvider(AuthProvider.LOCAL)// already encoded
                .isActive(true)
                .emailVerified(true)
                .build();

        userRepository.save(user);

        // Assign EMPLOYEE Role
        assignEmployeeRole(user);


        // Remove pending registration from Redis
        redisService.deletePendingRegistration(user.getEmail());

        return buildAuthenticationResponse(user);
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

    public void sendOtpForPwd(ForgetPasswordRequest forgetPasswordRequest){
        String otp=OtpGenerator.generateOtp();

        String email=forgetPasswordRequest.getEmail();
        if(!userRepository.existsByEmail(email)){
            throw new RuntimeException("Email doesn't exists");
        }

        PasswordResetRequest request=new PasswordResetRequest(email,otp);

        passwordRedisService.SavePasswordResetRequest(request);
        emailService.sendOtp(email,"User",otp);
    }

    public void verifyOtpForPwd(PasswordOtpRequest passwordOtpRequest){
        PasswordResetRequest request=passwordRedisService.getPasswordResetRequest(passwordOtpRequest.getEmail());

        if(request==null){
            throw new RuntimeException("OTP expired or not found");
        }

        System.out.println("Entered OTP: " + request.getOtp());
        System.out.println("Stored OTP: " + passwordOtpRequest.getOtp());
        if (!Objects.equals(passwordOtpRequest.getOtp(), request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        User user=userRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("Email not found "));

        user.setPasswordHash(passwordEncoder.encode(passwordOtpRequest.getPassword()));

        userRepository.save(user);

        passwordRedisService.deletePasswordResetRequest(request.getEmail());

    }

    public void resendOtpForPwd(ForgetPasswordRequest forgetPasswordRequest){

        sendOtpForPwd(forgetPasswordRequest);
    }



    private AuthenticationResponse buildAuthenticationResponse(User user){
        List<SimpleGrantedAuthority> authorities =
                userRoleRepository.findByUser(user)
                        .stream()
                        .map(ur -> new SimpleGrantedAuthority("ROLE_" + ur.getRole().getName()))
                        .toList();

        List<String> rolePriority = List.of(
                "SYS_ADMIN", "LND_ADMIN", "DEPARTMENT_HEAD", "HR_SPECIALIST",
                "ADMIN", "HR", "MANAGER", "EMPLOYEE"
        );

        String role = authorities.stream()
                .map(a -> a.getAuthority().replace("ROLE_", ""))
                .min((r1, r2) -> Integer.compare(
                        rolePriority.indexOf(r1),
                        rolePriority.indexOf(r2)
                ))
                .orElseThrow(() -> new RuntimeException("No role assigned to user"));

        String token=jwtService.generateToken(new CustomUserDetails(user,authorities));

        return AuthenticationResponse.builder()
                .token(token)
                .role(role)
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