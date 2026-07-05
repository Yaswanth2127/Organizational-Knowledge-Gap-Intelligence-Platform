package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.DepartmentResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Department;
import com.knowledgegap.knowledge_gap_platform.repository.DepartmentRepository;
import com.knowledgegap.knowledge_gap_platform.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImplementation implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    @Override
    public DepartmentResponse addDepartment(DepartmentRequest departmentRequest) {
        if(departmentRepository.existsByName(departmentRequest.getName())){
            throw new RuntimeException("Department Already Exists");
        }

        Department department= Department.builder().name(departmentRequest.getName()).description(departmentRequest.getDescription()).build();
        if (departmentRequest.getParentDeptId() != null) {
            Department parent = departmentRepository.findById(departmentRequest.getParentDeptId())
                    .orElseThrow(() -> new RuntimeException("Parent department not found"));

            department.setParentDepartment(parent);
        }
        department=departmentRepository.save(department);
        Long parentId = department.getParentDepartment() != null
                ? department.getParentDepartment().getId()
                : null;
        return new DepartmentResponse(department.getId(),department.getName(),department.getDescription(),parentId);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(dept -> new DepartmentResponse(
                        dept.getId(),
                        dept.getName(),
                        dept.getDescription(),
                        dept.getParentDepartment()!=null?dept.getParentDepartment().getId():null)).toList();

    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {

        Department department=departmentRepository.findById(id).orElseThrow(()->new RuntimeException("department not found "));
        Long parentId = department.getParentDepartment() != null
                ? department.getParentDepartment().getId()
                : null;
        return new DepartmentResponse(department.getId(),department.getName(),department.getDescription(),parentId);

    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest departmentRequest) {
        Department department=departmentRepository.findById(id).orElseThrow(()->new RuntimeException("Department not found"));

        if (!department.getName().equals(departmentRequest.getName())
                && departmentRepository.existsByName(departmentRequest.getName())) {

            throw new RuntimeException("Department already exists");
        }

        department.setName(departmentRequest.getName());
        department.setDescription(departmentRequest.getDescription());
        if (departmentRequest.getParentDeptId() != null) {

            Department parent = departmentRepository.findById(departmentRequest.getParentDeptId())
                    .orElseThrow(() -> new RuntimeException("Parent department not found"));

            department.setParentDepartment(parent);

        } else {

            department.setParentDepartment(null);
        }

       department=departmentRepository.save(department);
        Long parentId = department.getParentDepartment() != null
                ? department.getParentDepartment().getId()
                : null;


        return new DepartmentResponse(department.getId(),department.getName(),department.getDescription(),parentId);
    }

    @Override
    public void deleteDepartmentById(Long id) {
        if(!departmentRepository.existsById(id)){
            throw new RuntimeException("Department is not found");
        }
        departmentRepository.deleteById(id);
    }
}
