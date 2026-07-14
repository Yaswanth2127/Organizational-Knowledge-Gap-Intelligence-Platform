package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.model.PasswordResetRequest;
import com.knowledgegap.knowledge_gap_platform.service.PasswordRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class PasswordRedisServiceImpl implements PasswordRedisService {
    private  final RedisTemplate<String,Object> passwordResetRequestRedisTemplate;

    private static final  String PREFIX_KEY="passwordReset:";
    private static final Duration OTP_EXPIRY = Duration.ofMinutes(5);
    @Override
    public void SavePasswordResetRequest(PasswordResetRequest passwordResetRequest) {

        String key=buildKey(passwordResetRequest.getEmail());
        passwordResetRequestRedisTemplate.opsForValue().set(key,passwordResetRequest,OTP_EXPIRY);
    }

    @Override
    public PasswordResetRequest getPasswordResetRequest(String email) {
        String key=buildKey(email);

        return(PasswordResetRequest) passwordResetRequestRedisTemplate.opsForValue().get(key);

    }

    @Override
    public void deletePasswordResetRequest(String email) {

         passwordResetRequestRedisTemplate.delete(buildKey(email));
    }

    private String buildKey(String email){
        return PREFIX_KEY+email;
    }
}
