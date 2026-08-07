package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Notification;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    @EntityGraph(attributePaths = {"user"})
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    @EntityGraph(attributePaths = {"user"})
    List<Notification> findByUserAndStatus(User user, NotificationStatus status);

    @Override
    @EntityGraph(attributePaths = {"user"})
    Optional<Notification> findById(Long aLong);

    @Override
    @EntityGraph(attributePaths = {"user"})
    List<Notification> findAll();

    @EntityGraph(attributePaths = {"user"})
    List<Notification> findByUserIdAndStatusOrderByCreatedAtDesc(
            Long userId,
            NotificationStatus status);

    long countByUserIdAndStatus(
            Long userId,
            NotificationStatus status);
}

