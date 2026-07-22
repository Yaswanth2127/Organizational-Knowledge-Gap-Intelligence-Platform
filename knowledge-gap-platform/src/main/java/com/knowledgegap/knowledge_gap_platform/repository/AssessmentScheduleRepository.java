package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.AssessmentSchedule;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface AssessmentScheduleRepository 
        extends JpaRepository<AssessmentSchedule, Long> {


    List<AssessmentSchedule> findByUser(User user);


    List<AssessmentSchedule> findByCourse(Course course);


    List<AssessmentSchedule> findBySkill(Skill skill);


    List<AssessmentSchedule> findByCompleted(Boolean completed);


    List<AssessmentSchedule> findByScheduledDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );


    List<AssessmentSchedule> findByUserAndCompleted(
            User user,
            Boolean completed
    );


    // Assessment Reminder

    List<AssessmentSchedule> findByScheduledDateBetweenAndReminderSent(
            LocalDateTime start,
            LocalDateTime end,
            Boolean reminderSent
    );

}