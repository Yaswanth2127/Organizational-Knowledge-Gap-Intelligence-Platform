package com.knowledgegap.knowledge_gap_platform.service;



public interface EmailService {

    void sendOtp(String  email,String name,String otp);
}
