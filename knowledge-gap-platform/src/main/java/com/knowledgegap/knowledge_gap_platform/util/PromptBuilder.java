package com.knowledgegap.knowledge_gap_platform.util;

import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class PromptBuilder {


    public String BuildRecommendationPrompt(User user, Map<SkillGap,List<Course>> skillGapCourses){
        StringBuilder prompt=new StringBuilder();
        prompt.append("""
                You are an expert Learning & Development mentor.

                Your job is to analyze an employee's skill gaps and recommend
                the most suitable learning path.

                Employee Details
                ----------------
                """);
        prompt.append("Name: ")
                .append(user.getFullName())
                .append("\n");
        if (user.getJobRole() != null) {
            prompt.append("Job Role: ")
                    .append(user.getJobRole().getTitle())
                    .append("\n");
        }
        if (user.getDepartment() != null) {
            prompt.append("Department: ")
                    .append(user.getDepartment().getName())
                    .append("\n");
        }
        prompt.append("\nSkill Gaps\n");
        prompt.append("----------------\n");

        for(Map.Entry<SkillGap,List<Course>> skillGapCourse:skillGapCourses.entrySet()){
            SkillGap gap=skillGapCourse.getKey();
            prompt.append("Skill: ")
                    .append(gap.getSkill().getName())
                    .append("\n");

            prompt.append("Current Level: ")
                    .append(gap.getCurrentLevel())
                    .append("\n");

            prompt.append("Required Level :")
                    .append(gap.getRequiredLevel())
                    .append("\n");

            prompt.append("Gap Score")
                    .append(gap.getGapScore())
                    .append("\n");
            prompt.append("Gap severity")
                    .append(gap.getSeverity())
                    .append("\n");

            List<Course> courses=skillGapCourse.getValue();
            if (!courses.isEmpty()) {

                prompt.append("Available Courses:\n");

                for (Course course : courses) {
                    prompt.append("Course ID: ")
                            .append(course.getId())
                            .append("\n");

                    prompt.append("Title: ")
                            .append(course.getTitle())
                            .append("\n");

                    prompt.append("Provider: ")
                            .append(course.getProvider())
                            .append("\n");

                    prompt.append("Source: ")
                            .append(course.getSource())
                            .append("\n");

                    prompt.append("Difficulty: ")
                            .append(course.getDifficulty())
                            .append("\n");

                    prompt.append("Duration: ")
                            .append(course.getDurationHours())
                            .append(" hours\n");

                    prompt.append("External URL: ")
                            .append(course.getExternalUrl() == null ? "N/A" : course.getExternalUrl())
                            .append("\n\n");
                }

            }else{
                prompt.append("No internal courses available for this skill.\n");
            }
            prompt.append("\n");
        }
        prompt.append("""
        Instructions:

        1. Analyze each skill gap independently.
        2. Prioritize skills based on severity.
        3. Recommend up to 3 courses for each skill gap.
        4. Prefer the provided internal courses whenever they are suitable.
        5. If no suitable internal course exists, recommend external courses.
        6. For internal courses, always use the provided Course ID.
        7. For external courses, set courseId to null.
        8. Never invent or modify an existing Course ID.
        9. Do not recommend duplicate courses.
        10. Assign a sequenceOrder representing the recommended learning order.
        11. Give a relevanceScore between 0.0 and 1.0.
        12. Provide a short reason for every recommendation.
        13.For the "source" field, use ONLY one of these values:
                   - INTERNAL
                   - COURSERA
                   - UDEMY
                   - YOUTUBE
                   - EDX
                   - LINKEDIN_LEARNING
                   - OTHER
                   Never return "EXTERNAL".

        Return ONLY valid JSON.

        The JSON must exactly match the following structure:

        {
          "summary": "Overall learning summary",
          "recommendations": [
            {
              "skillGapId": 1,
              "skillName": "Java",
              "courses": [
                {
                  "courseId": 5,
                  "title": "Java Fundamentals",
                  "provider": "Internal LMS",
                  "source": "INTERNAL",
                  "externalUrl": null,
                  "relevanceScore": 0.98,
                  "reason": "Strong Java foundation is required.",
                  "sequenceOrder": 1
                }
              ]
            }
          ]
        }

        Do not include markdown.
        Do not include explanations.
        Do not wrap the JSON inside code blocks.
        Return JSON only.
        """);

        return prompt.toString();
    }
}
