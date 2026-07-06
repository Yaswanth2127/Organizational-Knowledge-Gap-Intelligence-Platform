package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkResponse;
import com.knowledgegap.knowledge_gap_platform.service.CompetencyFrameworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/competency-frameworks")
public class CompetencyFrameworkController {
    private final CompetencyFrameworkService competencyFrameworkService;

    @PostMapping("/add")
    public ResponseEntity<CompetencyFrameworkResponse> addCompetencyFramework(
            @RequestBody CompetencyFrameworkRequest competencyFrameworkRequest) {

        return ResponseEntity.ok(
                competencyFrameworkService.addCompetencyFramework(competencyFrameworkRequest)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<CompetencyFrameworkResponse>> getAllCompetencyFrameworks() {

        return ResponseEntity.ok(
                competencyFrameworkService.getAllCompetencyFrameworks()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompetencyFrameworkResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                competencyFrameworkService.getCompetencyFrameworkById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompetencyFrameworkResponse> update(
            @PathVariable Long id,
            @RequestBody CompetencyFrameworkRequest competencyFrameworkRequest) {

        return ResponseEntity.ok(
                competencyFrameworkService.updateCompetencyFramework(id, competencyFrameworkRequest)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        competencyFrameworkService.deleteCompetencyFrameworkById(id);
        return ResponseEntity.noContent().build();
    }
}
