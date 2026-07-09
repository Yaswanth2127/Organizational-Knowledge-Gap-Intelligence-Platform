package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.UpdateProfileRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;

import java.util.List;

public interface UserService{

    List<UserResponse> getAllUsers();
     UserResponse getUser(Long id);
     UserResponse updateUser(Long id, UpdateProfileRequest request);
     void delete(Long id);
     List<UserResponse> findLast7ByCreatedAtDesc();
}
