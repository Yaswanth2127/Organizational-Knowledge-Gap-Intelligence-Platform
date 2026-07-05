package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.JobRoleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.JobRoleResponse;

import java.util.List;

public interface JobRoleService {
    JobRoleResponse addJobRole(JobRoleRequest jobRoleRequest);
    List<JobRoleResponse> getAllJobRoles();
    JobRoleResponse getJobRoleById(Long id);
    JobRoleResponse updateJobRole(Long id,JobRoleRequest jobRoleRequest);
    void deleteJobRoleById(Long id);
}
