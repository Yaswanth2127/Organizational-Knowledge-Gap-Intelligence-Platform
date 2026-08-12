package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.UpdateProfileRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;


    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .toList();


    }

    @Override
    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToUserResponse(user);

    }



    @Override
    public UserResponse updateUser(Long id, UpdateProfileRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setProfileImageUrl(request.getProfileImageUrl());
        userRepository.save(user);

        User updatedUser = userRepository.findById(user.getId()).orElseThrow();

        return mapToUserResponse(updatedUser);


    }
    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);

    }

    @Override
    public List<UserResponse> findLast7ByCreatedAtDesc() {
        return userRepository.findTop7ByOrderByCreatedAtDesc().stream().map(
                this::mapToUserResponse
        ).toList();
    }

    private UserResponse mapToUserResponse(User user) {
        List<String> roles = userRoleRepository
                .findByUserId(user.getId())
                .stream()
                .map(userRole -> userRole.getRole().getName())
                .toList();
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())

                .departmentId(user.getDepartment() != null ? user.getDepartment().getId() : null)
                .departmentName(user.getDepartment() != null ? user.getDepartment().getName() : null)

                .jobRoleId(user.getJobRole() != null ? user.getJobRole().getId() : null)
                .jobRoleName(user.getJobRole() != null ? user.getJobRole().getTitle() : null)

                .managerId(user.getManager() != null ? user.getManager().getId() : null)
                .managerName(user.getManager() != null ? user.getManager().getFullName() : null)

                .phoneNumber(user.getPhoneNumber())
                .profileImageUrl(user.getProfileImageUrl())

                .isActive(user.getIsActive())
                .emailVerified(user.getEmailVerified())

                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .roles(roles)

                .build();
    }
}