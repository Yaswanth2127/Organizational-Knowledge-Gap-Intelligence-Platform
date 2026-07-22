package com.knowledgegap.knowledge_gap_platform.controller;


import com.knowledgegap.knowledge_gap_platform.service.AssessmentReminderService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AssessmentReminderController {


    private final AssessmentReminderService service;



    @PostMapping("/send")
    public String sendReminder(){

        service.sendAssessmentReminders();

        return "Reminder process executed";

    }

}