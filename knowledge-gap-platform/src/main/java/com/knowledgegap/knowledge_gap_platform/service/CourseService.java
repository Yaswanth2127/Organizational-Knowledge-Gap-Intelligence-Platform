package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.CourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CourseResponse;

import java.util.List;

public interface CourseService {

    CourseResponse createCourse(CourseRequest request);

    CourseResponse getCourseById(Long id);

    List<CourseResponse> getAllCourses();

    List<CourseResponse> getActiveCourses();

    List<CourseResponse> getCoursesBySkill(Long skillId);

    CourseResponse updateCourse(Long id, CourseRequest request);

    void deleteCourse(Long id);
}