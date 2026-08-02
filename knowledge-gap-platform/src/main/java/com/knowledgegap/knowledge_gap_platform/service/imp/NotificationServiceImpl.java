package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.NotificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.NotificationResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Notification;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationStatus;
import com.knowledgegap.knowledge_gap_platform.repository.NotificationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public NotificationResponse createNotification(NotificationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .type(request.getType())
                .channel(request.getChannel())
                .title(request.getTitle())
                .message(request.getMessage())
                .expiresAt(request.getExpiresAt())
                .status(NotificationStatus.PENDING)
                .build();

        notification = notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    @Override
    public NotificationResponse getNotificationById(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Notification not found"));

        return mapToResponse(notification);
    }

    @Override
    public List<NotificationResponse> getAllNotifications() {

        return notificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<NotificationResponse> getNotificationsByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<NotificationResponse> getPendingNotifications(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return notificationRepository
                .findByUserAndStatus(user, NotificationStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public NotificationResponse markAsRead(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Notification not found"));

        notification.setStatus(NotificationStatus.READ);
        notification.setReadAt(LocalDateTime.now());

        notification = notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    @Override
    public void deleteNotification(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Notification not found"));

        notificationRepository.delete(notification);
    }

    private NotificationResponse mapToResponse(Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())

                .userId(notification.getUser().getId())
                .userName(notification.getUser().getFullName())

                .type(notification.getType())
                .channel(notification.getChannel())

                .title(notification.getTitle())
                .message(notification.getMessage())

                .status(notification.getStatus())
                .readAt(notification.getReadAt())
                .expiresAt(notification.getExpiresAt())
                .createdAt(notification.getCreatedAt())

                .build();
    }
}