package com.knowledgegap.knowledge_gap_platform.scheduler;


import com.knowledgegap.knowledge_gap_platform.service.AssessmentReminderService;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;



@Component
@RequiredArgsConstructor
public class AssessmentReminderScheduler {


    private final AssessmentReminderService assessmentReminderService;



    /*
       Runs every day at 9 AM
    */

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendReminder(){

        assessmentReminderService
                .sendAssessmentReminders();

    }

}