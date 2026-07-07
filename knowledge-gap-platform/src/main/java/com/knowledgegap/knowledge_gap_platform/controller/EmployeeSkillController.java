package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillResponse;
import com.knowledgegap.knowledge_gap_platform.service.EmployeeSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
@RestController
@RequestMapping("/api/employee-skills")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeSkillController {

    private final EmployeeSkillService employeeSkillService;

    @PostMapping("/add")
    public ResponseEntity<EmployeeSkillResponse> addEmployeeSkill(
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(employeeSkillService.addEmployeeSkill(request));
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeSkillResponse>> getAll(){

        return ResponseEntity.ok(employeeSkillService.getAllEmployeeSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeSkillResponse> getById(@PathVariable Long id){

        return ResponseEntity.ok(employeeSkillService.getEmployeeSkillById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeSkillResponse> update(
            @PathVariable Long id,
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(employeeSkillService.updateEmployeeSkill(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){

        employeeSkillService.deleteEmployeeSkillById(id);
        return ResponseEntity.noContent().build();
    }
}