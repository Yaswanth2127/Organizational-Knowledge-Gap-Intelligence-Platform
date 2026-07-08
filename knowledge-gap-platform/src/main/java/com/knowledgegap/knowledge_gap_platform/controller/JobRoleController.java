package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.JobRoleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.JobRoleResponse;
import com.knowledgegap.knowledge_gap_platform.service.JobRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasRole('SYS_ADMIN')")
@RestController
@RequestMapping("/api/job-roles")
@CrossOrigin("*")
@RequiredArgsConstructor
public class JobRoleController {
    private final JobRoleService jobRoleService;

    @PostMapping("/add")
    public ResponseEntity<JobRoleResponse> addJobRole(@RequestBody JobRoleRequest jobRoleRequest){
        return ResponseEntity.ok(jobRoleService.addJobRole(jobRoleRequest));
    }

    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
    @GetMapping("/all")
    public ResponseEntity<List<JobRoleResponse>> getAllJobRoles(){
        return ResponseEntity.ok(jobRoleService.getAllJobRoles());

    }

    @GetMapping("/{id}")
    public ResponseEntity<JobRoleResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(jobRoleService.getJobRoleById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<JobRoleResponse> update(@PathVariable Long id,
                                                  @RequestBody JobRoleRequest jobRoleRequest){
        return ResponseEntity.ok(jobRoleService.updateJobRole(id,jobRoleRequest));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        jobRoleService.deleteJobRoleById(id);
        return ResponseEntity.noContent().build();
    }
}
