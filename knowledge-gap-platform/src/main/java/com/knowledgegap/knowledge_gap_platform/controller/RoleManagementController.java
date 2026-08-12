package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.AssignRolesRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RoleResponse;
import com.knowledgegap.knowledge_gap_platform.service.RoleManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RoleManagementController {
    private final RoleManagementService roleManagementService;

    @PreAuthorize("hasRole('SYS_ADMIN')")
    @GetMapping
    public ResponseEntity<List<RoleResponse>> getAllRoles() {

        return ResponseEntity.ok(
                roleManagementService.getAllRoles()
        );
    }

    /**
     * Get roles assigned to a particular user.
     */
    @PreAuthorize("hasRole('SYS_ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RoleResponse>> getUserRoles(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                roleManagementService.getUserRoles(userId)
        );
    }

    @PreAuthorize("hasRole('SYS_ADMIN')")
    @PutMapping("/user/{userId}")
    public ResponseEntity<List<RoleResponse>> assignRoles(
            @PathVariable Long userId,
            @RequestBody AssignRolesRequest request
    ) {

        return ResponseEntity.ok(
                roleManagementService.assignRoles(
                        userId,
                        request
                )
        );
    }

}
