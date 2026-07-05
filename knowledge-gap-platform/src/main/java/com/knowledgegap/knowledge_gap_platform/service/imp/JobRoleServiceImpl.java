package com.knowledgegap.knowledge_gap_platform.service.imp;


import com.knowledgegap.knowledge_gap_platform.dto.JobRoleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.JobRoleResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Department;
import com.knowledgegap.knowledge_gap_platform.entity.JobRole;
import com.knowledgegap.knowledge_gap_platform.repository.DepartmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.JobRoleRepository;
import com.knowledgegap.knowledge_gap_platform.service.JobRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobRoleServiceImpl implements JobRoleService {
    private final JobRoleRepository jobRoleRepository;
    private final DepartmentRepository departmentRepository;
    @Override
    public JobRoleResponse addJobRole(JobRoleRequest jobRoleRequest) {
        JobRole jobRole=JobRole.builder().
                title(jobRoleRequest.getTitle()).
                description(jobRoleRequest.getDescription()).build();
        if(jobRoleRequest.getDepartmentId()!=null){
            Department department=departmentRepository.findById(jobRoleRequest.getDepartmentId())
                    .orElseThrow(()->new RuntimeException("Department not found"));
            if(jobRoleRepository.existsByTitleAndDepartmentId(jobRoleRequest.getTitle(),department.getId())){
                throw new RuntimeException("Job Role in that department already exists");
            }
            jobRole.setDepartment(department);

        }else{
            jobRole.setDepartment(null);
        }
        jobRole=jobRoleRepository.save(jobRole);
        Long deptId=jobRole.getDepartment()!=null?jobRole.getDepartment().getId():null;


        return new JobRoleResponse(jobRole.getId(),jobRole.getTitle(),deptId,jobRole.getDescription());
    }

    @Override
    public List<JobRoleResponse> getAllJobRoles() {
        return jobRoleRepository.findAll()
                .stream()
                .map(jobRole -> new JobRoleResponse(
                        jobRole.getId(),
                        jobRole.getTitle(),
                        jobRole.getDepartment() != null
                                ? jobRole.getDepartment().getId()
                                : null,
                        jobRole.getDescription()
                ))
                .toList();
    }

    @Override
    public JobRoleResponse getJobRoleById(Long id) {
        JobRole jobRole=jobRoleRepository.findById(id).orElseThrow(()->new RuntimeException("Job Role not found "));
        Long departmentId=jobRole.getDepartment()!=null?jobRole.getDepartment().getId():null;
        return  new JobRoleResponse(jobRole.getId(),jobRole.getTitle(), departmentId, jobRole.getDescription());
    }

    @Override
    public JobRoleResponse updateJobRole(Long id, JobRoleRequest jobRoleRequest) {
        JobRole jobRole=jobRoleRepository.findById(id).orElseThrow(()->new RuntimeException("Job Role is not found "));


        if(jobRoleRequest.getDepartmentId()!=null){
            Department department=departmentRepository.findById(jobRoleRequest.getDepartmentId())
                    .orElseThrow(()->new RuntimeException("Department not found"));
            if (jobRoleRepository.existsByTitleAndDepartmentIdAndIdNot(jobRoleRequest.getTitle(), department.getId(),id )){
                throw new RuntimeException("Job role already exists in this department");
            }else{
                jobRole.setDepartment(department);
            }
        }else{
            jobRole.setDepartment(null);
        }
        jobRole.setTitle(jobRoleRequest.getTitle());
        jobRole.setDescription(jobRoleRequest.getDescription());

        jobRole=jobRoleRepository.save(jobRole);
        Long departmentId=jobRole.getDepartment()!=null?jobRole.getDepartment().getId():null;
        return  new JobRoleResponse(jobRole.getId(),jobRole.getTitle(),departmentId,jobRole.getDescription());
    }

    @Override
    public void deleteJobRoleById(Long id) {
        if(!jobRoleRepository.existsById(id)){
            throw new RuntimeException("Job role is not found ");
        }
        jobRoleRepository.deleteById(id);
    }
}
