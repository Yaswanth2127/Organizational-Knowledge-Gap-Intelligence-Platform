package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.NotificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.NotificationResponse;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(NotificationRequest request);

    NotificationResponse getNotificationById(Long id);

    List<NotificationResponse> getAllNotifications();

    List<NotificationResponse> getNotificationsByUser(Long userId);

    List<NotificationResponse> getMyNotifications();

    List<NotificationResponse> getMyUnreadNotifications();

    NotificationResponse markAsRead(Long notificationId);

    void markAllAsRead();

    long getUnreadCount();

    void deleteNotification(Long id);
}
