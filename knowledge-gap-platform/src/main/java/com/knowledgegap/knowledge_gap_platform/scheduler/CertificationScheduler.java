package com.knowledgegap.knowledge_gap_platform.scheduler;

import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.repository.CertificationRepository;
import com.knowledgegap.knowledge_gap_platform.service.NotificationHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CertificationScheduler {

    private final CertificationRepository certificationRepository;
    private final NotificationHelper notificationHelper;

    /**
     * Runs every day at 9:00 AM.
     *
     * Checks certification expiry dates and sends notifications:
     * - 30 days before expiry
     * - 7 days before expiry
     * - 1 day before expiry
     * - On the expiry date
     */
    @Scheduled(cron = "0 0 9 * * *")
    public void checkCertificationExpiry() {

        List<Certification> certifications =
                certificationRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Certification certification : certifications) {

            // Skip certifications without an expiry date
            if (certification.getExpiryDate() == null) {
                continue;
            }

            long daysRemaining = ChronoUnit.DAYS.between(
                    today,
                    certification.getExpiryDate()
            );

            if (daysRemaining == 30 ||
                    daysRemaining == 7 ||
                    daysRemaining == 1) {

                notificationHelper.notifyCertificationExpiring(
                        certification,
                        daysRemaining
                );

            } else if (daysRemaining == 0) {

                notificationHelper.notifyCertificationExpired(
                        certification
                );
            }
        }
    }
}