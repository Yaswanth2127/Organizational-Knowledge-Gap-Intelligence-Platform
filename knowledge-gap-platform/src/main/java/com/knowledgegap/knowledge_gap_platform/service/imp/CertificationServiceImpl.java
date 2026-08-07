package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.AdminCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.CertificationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import com.knowledgegap.knowledge_gap_platform.service.CloudinaryService;
import com.knowledgegap.knowledge_gap_platform.service.NotificationHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;
    private final SkillRepository skillRepository;
    private final CloudinaryService cloudinaryService;
    private final AuthenticationService authenticationService;
    private final NotificationHelper notificationHelper;
    //employee
    @Override
    public CertificationResponse addMyCertification(EmployeeCertificationRequest request, MultipartFile file) {

        User user = authenticationService.getCurrentUser();

        String uploadedFileUrl = null;

        if (file != null && !file.isEmpty()) {
            try {
                uploadedFileUrl = cloudinaryService.uploadFile(file);
            } catch (Exception e) {
                throw new RuntimeException("File upload failed");

            }
        }

        Certification certification = Certification.builder()
                .user(user)
                .name(request.getName())
                .issuer(request.getIssuer())
                .credentialUrl(request.getCredentialUrl())
                .fileUrl(uploadedFileUrl)
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .build();

        if (request.getSkillId() != null) {
            Skill skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);
        }

        certification = certificationRepository.save(certification);
        long daysRemaining =
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        certification.getExpiryDate()
                );
        if (daysRemaining < 0) {

            notificationHelper.notifyCertificationExpired(certification);

        }
        else if (daysRemaining <= 30) {

            notificationHelper.notifyCertificationExpiring(certification,daysRemaining);

        }

        return mapToResponse(certification);
    }

    @Override
    public List<CertificationResponse> getMyCertifications() {
        User user=authenticationService.getCurrentUser();

        return certificationRepository.findByUser(user)
                .stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional
    public CertificationResponse updateMyCertification(Long id, EmployeeCertificationRequest request, MultipartFile file) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        User user = authenticationService.getCurrentUser();

        certification.setUser(user);

        if (request.getSkillId() != null) {

            Skill skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);

        } else {

            certification.setSkill(null);
        }

        certification.setName(request.getName());
        certification.setIssuer(request.getIssuer());
        certification.setCredentialUrl(request.getCredentialUrl());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());

        if (file != null && !file.isEmpty()) {

            try {
                String uploadedFileUrl = cloudinaryService.uploadFile(file);
                certification.setFileUrl(uploadedFileUrl);

            } catch (IOException e) {

                throw new RuntimeException("File upload failed");
            }
        }

        certification = certificationRepository.save(certification);

        return mapToResponse(certification);
    }

    @Override
    public void deleteMyCertification(Long id) {
        deleteCertificationById(id);
    }


    //hr and admin
    @Override
    public CertificationResponse addCertification(
            AdminCertificationRequest request,
            MultipartFile file) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String uploadedFileUrl = null;

        if (file != null && !file.isEmpty()) {
            try {
                uploadedFileUrl = cloudinaryService.uploadFile(file);
            } catch (IOException e) {
                throw new RuntimeException("File upload failed");
            }
        }

        Certification certification = Certification.builder()
                .user(user)
                .name(request.getName())
                .issuer(request.getIssuer())
                .credentialUrl(request.getCredentialUrl())
                .fileUrl(uploadedFileUrl)
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .build();

        if (request.getSkillId() != null) {
            Skill skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);
        }

        certification = certificationRepository.save(certification);

        return mapToResponse(certification);
    }

    @Override
    public List<CertificationResponse> getAllCertifications() {

        return certificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CertificationResponse getCertificationById(Long id) {

        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        return mapToResponse(certification);
    }

    @Transactional
    @Override
    public CertificationResponse updateCertification(
            Long id,
            AdminCertificationRequest request,
            MultipartFile file) {

        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        certification.setUser(user);

        if (request.getSkillId() != null) {

            Skill skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);

        } else {

            certification.setSkill(null);
        }

        certification.setName(request.getName());
        certification.setIssuer(request.getIssuer());
        certification.setCredentialUrl(request.getCredentialUrl());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());

        if (file != null && !file.isEmpty()) {

            try {
                String uploadedFileUrl = cloudinaryService.uploadFile(file);
                certification.setFileUrl(uploadedFileUrl);

            } catch (IOException e) {

                throw new RuntimeException("File upload failed");
            }
        }

        certification = certificationRepository.save(certification);

        return mapToResponse(certification);
    }

    @Override
    public void deleteCertificationById(Long id) {

        if (!certificationRepository.existsById(id)) {
            throw new RuntimeException("Certification not found");
        }

        certificationRepository.deleteById(id);
    }

    private CertificationResponse mapToResponse(Certification certification) {


        return CertificationResponse.builder()
                .id(certification.getId())
                .userId(certification.getUser().getId())
                .userName(certification.getUser().getFullName())
                .skillId(certification.getSkill() != null
                        ? certification.getSkill().getId()
                        : null)
                .skillName(certification.getSkill()!=null ?
                        certification.getSkill().getName():null)
                .name(certification.getName())
                .issuer(certification.getIssuer())
                .credentialUrl(certification.getCredentialUrl())
                .fileUrl(certification.getFileUrl())
                .issueDate(certification.getIssueDate())
                .expiryDate(certification.getExpiryDate())
                .build();
    }
}