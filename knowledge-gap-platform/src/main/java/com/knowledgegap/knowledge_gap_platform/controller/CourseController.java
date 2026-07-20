package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.CourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CourseResponse;
import com.knowledgegap.knowledge_gap_platform.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // Create Course
    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @Valid @RequestBody CourseRequest request) {

        CourseResponse response = courseService.createCourse(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get Course by ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Long id) {

        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    // Get All Courses
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {

        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // Get Active Courses
    @GetMapping("/active")
    public ResponseEntity<List<CourseResponse>> getActiveCourses() {

        return ResponseEntity.ok(courseService.getActiveCourses());
    }

    // Get Courses by Skill
    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<CourseResponse>> getCoursesBySkill(
            @PathVariable Long skillId) {

        return ResponseEntity.ok(courseService.getCoursesBySkill(skillId));
    }

    // Update Course
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request) {

        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    // Delete Course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {

        courseService.deleteCourse(id);

        return ResponseEntity.ok("Course deleted successfully.");
    }
}