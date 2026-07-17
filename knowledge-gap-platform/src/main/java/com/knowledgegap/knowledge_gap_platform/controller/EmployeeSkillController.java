package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillResponse;
import com.knowledgegap.knowledge_gap_platform.service.EmployeeSkillService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-skills")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeSkillController {

    private final EmployeeSkillService employeeSkillService;

    // ===========================
    // Employee Self Assessment
    // ===========================

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<EmployeeSkillResponse> addEmployeeSkill(
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(
                employeeSkillService.addEmployeeSkill(request)
        );
    }

    // ===========================
    // View Own Skills
    // ===========================

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EmployeeSkillResponse>> getByUserId(
            @PathVariable Long userId){

        return ResponseEntity.ok(
                employeeSkillService.getEmployeeSkillsByUserId(userId)
        );

    }

    // ===========================
    // HR/Admin
    // ===========================

    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeSkillResponse>> getAll(){

        return ResponseEntity.ok(
                employeeSkillService.getAllEmployeeSkills()
        );

    }

    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeSkillResponse> getById(
            @PathVariable Long id){

        return ResponseEntity.ok(
                employeeSkillService.getEmployeeSkillById(id)
        );

    }

    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeSkillResponse> update(
            @PathVariable Long id,
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(
                employeeSkillService.updateEmployeeSkill(id, request)
        );

    }

    @PreAuthorize("hasRole('SYS_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable Long id){

        employeeSkillService.deleteEmployeeSkillById(id);

        return ResponseEntity.noContent().build();

    }



}