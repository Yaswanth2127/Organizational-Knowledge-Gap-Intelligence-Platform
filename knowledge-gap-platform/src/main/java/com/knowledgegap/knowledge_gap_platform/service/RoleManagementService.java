package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.AssignRolesRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RoleResponse;

import java.util.List;

public interface RoleManagementService {
    List<RoleResponse> getAllRoles();

    List<RoleResponse> getUserRoles(Long userId);

    List<RoleResponse> assignRoles(
            Long userId,
            AssignRolesRequest request
    );
}
