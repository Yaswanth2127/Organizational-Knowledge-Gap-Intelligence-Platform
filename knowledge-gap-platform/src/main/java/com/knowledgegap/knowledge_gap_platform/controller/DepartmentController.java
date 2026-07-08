package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.DepartmentResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Department;
import com.knowledgegap.knowledge_gap_platform.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasRole('SYS_ADMIN')")
@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DepartmentController {
    private final DepartmentService departmentService;
    @PostMapping("/add")
    public ResponseEntity<DepartmentResponse> addDepartment(@RequestBody DepartmentRequest department){
       return ResponseEntity.ok(departmentService.addDepartment(department));
    }

    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
    @GetMapping("/all")
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments(){
        return ResponseEntity.ok(departmentService.getAllDepartments());

    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(departmentService.getDepartmentById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponse> update(@PathVariable Long id,
                                    @RequestBody DepartmentRequest department){
        return ResponseEntity.ok(departmentService.updateDepartment(id,department));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
       departmentService.deleteDepartmentById(id);
       return ResponseEntity.noContent().build();
    }




}
