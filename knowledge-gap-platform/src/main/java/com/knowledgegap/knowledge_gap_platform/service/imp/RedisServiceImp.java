package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.model.PendingRegistration;
import com.knowledgegap.knowledge_gap_platform.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisServiceImp implements RedisService {

    private final RedisTemplate<String ,PendingRegistration> redisTemplate;
    @Override
    public void savePendingRegistration(PendingRegistration pendingRegistration) {
        String key= "pending:"+pendingRegistration.getEmail();
        redisTemplate.opsForValue().set(key,pendingRegistration, Duration.ofMinutes(5));
    }

    @Override
    public PendingRegistration getPendingRegistration(String email) {
        String key = "pending:" + email;

        return redisTemplate.opsForValue().get(key);

    }

    @Override
    public void deletePendingRegistration(String email) {
        String key = "pending:" + email;

        redisTemplate.delete(key);
    }
}
