package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.NotificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.NotificationResponse;
import com.knowledgegap.knowledge_gap_platform.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService notificationService;

    // Create Notification
    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(
            @Valid @RequestBody NotificationRequest request) {

        return new ResponseEntity<>(
                notificationService.createNotification(request),
                HttpStatus.CREATED
        );
    }

    // Get Notification By ID
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getNotificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.getNotificationById(id)
        );
    }

    // Get All Notifications
    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {

        return ResponseEntity.ok(
                notificationService.getAllNotifications()
        );
    }

    // Get Notifications By User
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<List<NotificationResponse>> getMyNotifications(
            ) {

        return ResponseEntity.ok(
                notificationService.getMyNotifications()
        );
    }

    // Get unread Notifications
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/me/unread")
    public ResponseEntity<List<NotificationResponse>> getMyUnreadNotifications(
           ) {

        return ResponseEntity.ok(
                notificationService.getMyUnreadNotifications()
        );
    }

    // Mark Notification as Read
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markAsRead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.markAsRead(id)
        );
    }

    // Delete Notification
    @PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @PatchMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead() {

        notificationService.markAllAsRead();

        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR_SPECIALIST','SYS_ADMIN')")
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(
                notificationService.getUnreadCount()
        );
    }
}