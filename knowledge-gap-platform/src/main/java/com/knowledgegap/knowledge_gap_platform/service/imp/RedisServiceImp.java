package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.model.PendingRegistration;
import com.knowledgegap.knowledge_gap_platform.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;



@Service
@RequiredArgsConstructor
public class RedisServiceImp implements RedisService {
    private final static String PENDING_PREFIX="pending:";
    private static final Duration OTP_EXPIRY = Duration.ofMinutes(5);
    private final RedisTemplate<String ,Object> redisTemplate;
    @Override
    public void savePendingRegistration(PendingRegistration pendingRegistration) {

        redisTemplate.opsForValue().set(buildKey(pendingRegistration.getEmail()),pendingRegistration, OTP_EXPIRY);
    }

    @Override
    public PendingRegistration getPendingRegistration(String email) {
        String key = buildKey(email);

        return (PendingRegistration) redisTemplate.opsForValue().get(key);

    }

    @Override
    public void deletePendingRegistration(String email) {


        redisTemplate.delete(buildKey(email));
    }

    private String buildKey(String email) {
        return PENDING_PREFIX + email;
    }
}
