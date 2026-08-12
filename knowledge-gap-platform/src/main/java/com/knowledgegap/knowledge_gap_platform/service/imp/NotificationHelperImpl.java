package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.ArticleDeletionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.NotificationRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeArticle;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationChannel;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationType;
import com.knowledgegap.knowledge_gap_platform.service.NotificationHelper;
import com.knowledgegap.knowledge_gap_platform.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationHelperImpl implements NotificationHelper {
    private final NotificationService notificationService;
    @Override
    public void notifyAssessmentApproved(Assessment assessment) {

        Long userId=assessment.getUser().getId();
        NotificationRequest request =
                NotificationRequest.builder()
                        .userId(userId)
                        .type(NotificationType.ASSESSMENT_ACCEPTED)
                        .channel(NotificationChannel.IN_APP)
                        .title("Assessment Approved")
                        .message(
                                assessment.getTitle() +
                                        " assessment has been approved."
                        )
                        .build();

        notificationService.createNotification(request);
    }

    @Override
    public void notifyAssessmentRejected(Assessment assessment) {
        NotificationRequest request = NotificationRequest.builder()
                .userId(assessment.getUser().getId())
                .type(NotificationType.ASSESSMENT_REJECTED)
                .channel(NotificationChannel.IN_APP)
                .title("Assessment Rejected")
                .message(
                        "Your assessment \"" +
                                assessment.getSkill().getName() +
                                "\" has been rejected. Please review the feedback and submit again."
                )
                .build();

        notificationService.createNotification(request);


    }

    @Override
    public void notifyCertificationExpiring(Certification certification,Long days) {
        NotificationRequest request = NotificationRequest.builder()
                .userId(certification.getUser().getId())
                .type(NotificationType.CERTIFICATION_EXPIRING)
                .channel(NotificationChannel.IN_APP)
                .title("Certification Expiring Soon")
                .message(
                        "Your certification \"" +
                                certification.getName() +
                                "\" will expire in " +
                                days +
                                " day" +
                                (days == 1 ? "" : "s") +
                                ". Please renew it before the expiry date."
                )
                .build();

        notificationService.createNotification(request);


    }

    @Override
    public void notifyCertificationExpired(Certification certification) {
        NotificationRequest request = NotificationRequest.builder()
                .userId(certification.getUser().getId())
                .type(NotificationType.CERTIFICATION_EXPIRED)
                .channel(NotificationChannel.IN_APP)
                .title("Certification Expired")
                .message(
                        "Your certification \"" +
                                certification.getName() +
                                "\" has expired. Please renew or upload a valid certification."
                )
                .build();

        notificationService.createNotification(request);


    }

    @Override
    public void articleDeletionByAdmin(KnowledgeArticle knowledgeArticle, ArticleDeletionRequest request) {
        NotificationRequest notificationRequest =
                NotificationRequest.builder()
                        .userId(knowledgeArticle.getAuthor().getId())
                        .channel(NotificationChannel.IN_APP)
                        .type(NotificationType.ARTICLE_DELETED_BY_ADMIN)
                        .title("Knowledge Article Deleted")
                        .message(
                                "Your article \"" +
                                        knowledgeArticle.getTitle() +
                                        "\" was deleted by an administrator. " +
                                        "Reason: " +
                                        request.getReason()
                        )
                        .build();

        notificationService.createNotification(notificationRequest);
    }
}
