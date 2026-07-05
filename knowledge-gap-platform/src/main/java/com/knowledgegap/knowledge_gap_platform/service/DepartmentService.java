package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {
    DepartmentResponse addDepartment(DepartmentRequest departmentRequest);
    List<DepartmentResponse> getAllDepartments();
    DepartmentResponse getDepartmentById(Long id);
    DepartmentResponse updateDepartment(Long id,DepartmentRequest departmentRequest);
    void deleteDepartmentById(Long id);

}
