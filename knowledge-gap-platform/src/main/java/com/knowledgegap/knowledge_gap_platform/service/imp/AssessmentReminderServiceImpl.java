package com.knowledgegap.knowledge_gap_platform.service.imp;


import com.knowledgegap.knowledge_gap_platform.entity.AssessmentSchedule;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentScheduleRepository;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentReminderService;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;



@Service
@RequiredArgsConstructor
public class AssessmentReminderServiceImpl 
        implements AssessmentReminderService {


    private final AssessmentScheduleRepository assessmentScheduleRepository;

    private final JavaMailSender javaMailSender;



    @Override
    public void sendAssessmentReminders() {


        LocalDateTime now = LocalDateTime.now();


        // Reminder window: next 24 hours

        LocalDateTime tomorrow = now.plusDays(1);



        List<AssessmentSchedule> schedules =
                assessmentScheduleRepository
                .findByScheduledDateBetweenAndReminderSent(
                        now,
                        tomorrow,
                        false
                );



        for(AssessmentSchedule schedule : schedules){


            sendEmail(schedule);



            schedule.setReminderSent(true);

            schedule.setReminderSentAt(
                    LocalDateTime.now()
            );


            assessmentScheduleRepository.save(schedule);

        }

    }




    private void sendEmail(
            AssessmentSchedule schedule){


        SimpleMailMessage message =
                new SimpleMailMessage();



        message.setTo(
                schedule.getUser().getEmail()
        );


        message.setSubject(
                "Assessment Reminder - "
                + schedule.getTitle()
        );


        message.setText(
                "Hello "
                + schedule.getUser().getFullName()
                + ",\n\n"
                + "This is a reminder that your assessment "
                + schedule.getTitle()
                + " is scheduled on "
                + schedule.getScheduledDate()
                + ".\n\n"
                + "Course : "
                + schedule.getCourse().getTitle()
                + "\n"
                + "Skill : "
                + schedule.getSkill().getName()
                + "\n\n"
                + "Please complete your assessment on time."
        );



        javaMailSender.send(message);

    }

}