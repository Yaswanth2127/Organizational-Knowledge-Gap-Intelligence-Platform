package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class EmailServiceImp implements EmailService {

    private final JavaMailSender mailSender;
    @Override
    public void sendOtp(String email,String name, String otp) {

        SimpleMailMessage mailMessage=new SimpleMailMessage();

        mailMessage.setTo(email);
        mailMessage.setSubject("Email Verification - OTP");
        mailMessage.setText( "Dear "+ name+"\n\n" +
                "Your OTP for email verification is: " + otp +
                "\n\nThis OTP is valid for 5 minutes." +
                "\n\nDo not share this OTP with anyone." +
                "\n\nRegards,\nKnowledge Gap Platform"
        );
        mailSender.send(mailMessage);

    }
}
