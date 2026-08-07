package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillResponse;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillReviewRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillStatisticsResponse;
import com.knowledgegap.knowledge_gap_platform.service.EmployeeSkillService;

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


    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    @PostMapping()
    public ResponseEntity<EmployeeSkillResponse> addOwnEmployeeSkill(
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(
                employeeSkillService.addEmployeeSkill(request)
        );
    }



    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EmployeeSkillResponse>> getByUserId(
            @PathVariable Long userId){

        return ResponseEntity.ok(
                employeeSkillService.getEmployeeSkillsByUserId(userId)
        );

    }



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

    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeSkillResponse> update(
            @PathVariable Long id,
            @RequestBody EmployeeSkillRequest request){

        return ResponseEntity.ok(
                employeeSkillService.updateEmployeeSkill(id, request)
        );

    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','SYS_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable Long id){

        employeeSkillService.deleteEmployeeSkillById(id);

        return ResponseEntity.noContent().build();
    }
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    @GetMapping("/me")
    public ResponseEntity<List<EmployeeSkillResponse>> getMySkills() {

        return ResponseEntity.ok(
                employeeSkillService.getMySkills()
        );
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @PatchMapping("/{id}/peer-review")
    public ResponseEntity<EmployeeSkillResponse> submitPeerReview(
            @PathVariable Long id,
            @RequestBody EmployeeSkillReviewRequest request){

        return ResponseEntity.ok(
                employeeSkillService.submitPeerReview(id, request)
        );
    }
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/peer-review/eligible")
    public ResponseEntity<List<EmployeeSkillResponse>>
    getEligiblePeerReviews(){

        return ResponseEntity.ok(
                employeeSkillService.getEligiblePeerReviews()
        );

    }
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/statistics")
    public ResponseEntity<EmployeeSkillStatisticsResponse>
    getStatistics(){

        return ResponseEntity.ok(
                employeeSkillService.getStatistics()
        );

    }
    @PostMapping("/assign/{userId}")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
    public ResponseEntity<EmployeeSkillResponse> assignSkill(@PathVariable Long userId,
            @RequestBody EmployeeSkillRequest request) {

        return ResponseEntity.ok(
                employeeSkillService.assignSkill(userId,request)
        );
    }




}