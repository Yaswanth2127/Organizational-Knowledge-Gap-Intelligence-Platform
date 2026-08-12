package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.AssignRolesRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RoleResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Role;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.UserRole;
import com.knowledgegap.knowledge_gap_platform.entity.UserRoleId;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.RoleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.service.RoleManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleManagementServiceImpl implements RoleManagementService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;

    @Override
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAllByOrderByNameAsc()
                .stream().map(this::mapToRoleResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getUserRoles(Long userId) {
        if(!userRepository.existsById(userId)){
            throw new ResourceNotFoundException("User not found ");

        }
        return userRoleRepository.findByUserId(userId).
                stream().map(UserRole::getRole).map(this::mapToRoleResponse).toList();
    }

    @Override
    @Transactional
    public List<RoleResponse> assignRoles(Long userId, AssignRolesRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );
        if (request == null ||
                request.getRoleIds() == null ||
                request.getRoleIds().isEmpty()) {

            throw new IllegalArgumentException(
                    "At least one role must be assigned"
            );
        }

        List<Role> roles = roleRepository.findAllById(
                request.getRoleIds()
        );
        if (roles.size() != request.getRoleIds().size()) {
            throw new RuntimeException(
                    "One or more roles were not found"
            );
        }

        userRoleRepository.deleteByUserId(userId);

        List<UserRole> userRoles = roles.stream()
                .map(role -> {

                    UserRoleId userRoleId =
                            new UserRoleId(
                                    user.getId(),
                                    role.getId()
                            );

                    return UserRole.builder()
                            .id(userRoleId)
                            .user(user)
                            .role(role)
                            .build();
                })
                .toList();

            userRoleRepository.saveAll(userRoles);

        return roles.stream()
                .map(this::mapToRoleResponse)
                .toList();

    }
    private RoleResponse mapToRoleResponse(Role role) {

        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }
}
