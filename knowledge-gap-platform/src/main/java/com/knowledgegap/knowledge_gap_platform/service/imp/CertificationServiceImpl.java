package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.knowledgegap.knowledge_gap_platform.dto.AdminCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.CertificationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import com.knowledgegap.knowledge_gap_platform.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final CloudinaryService cloudinaryService;

    // ============================================================
    // EMPLOYEE - ADD MY CERTIFICATION
    // ============================================================

    @Override
    public CertificationResponse addMyCertification(
            EmployeeCertificationRequest request,
            MultipartFile file) {

        User user = getCurrentUser();

        Skill skill = null;

        if (request.getSkillId() != null) {
            skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() ->
                            new RuntimeException("Skill not found with id: "
                                    + request.getSkillId()));
        }

        String fileUrl = null;

        if (file != null && !file.isEmpty()) {
            fileUrl = uploadFile(file);
        }

        Certification certification = Certification.builder()
                .user(user)
                .skill(skill)
                .name(request.getName())
                .issuer(request.getIssuer())
                .credentialUrl(request.getCredentialUrl())
                .fileUrl(fileUrl)
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .build();

        Certification saved =
                certificationRepository.save(certification);

        return mapToResponse(saved);
    }

    // ============================================================
    // EMPLOYEE - GET MY CERTIFICATIONS
    // ============================================================

    @Override
    public List<CertificationResponse> getMyCertifications() {

        User user = getCurrentUser();

        return certificationRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ============================================================
    // EMPLOYEE - UPDATE MY CERTIFICATION
    // ============================================================

    @Override
    public CertificationResponse updateMyCertification(
            Long id,
            EmployeeCertificationRequest request,
            MultipartFile file) {

        User user = getCurrentUser();

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found with id: " + id));

        if (!certification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You are not authorized to update this certification");
        }

        Skill skill = null;

        if (request.getSkillId() != null) {
            skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Skill not found with id: "
                                            + request.getSkillId()));
        }

        if (file != null && !file.isEmpty()) {
            certification.setFileUrl(uploadFile(file));
        }

        certification.setSkill(skill);
        certification.setName(request.getName());
        certification.setIssuer(request.getIssuer());
        certification.setCredentialUrl(request.getCredentialUrl());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());

        Certification updated =
                certificationRepository.save(certification);

        return mapToResponse(updated);
    }

    // ============================================================
    // EMPLOYEE - DELETE MY CERTIFICATION
    // ============================================================

    @Override
    public void deleteMyCertification(Long id) {

        User user = getCurrentUser();

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found with id: " + id));

        if (!certification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You are not authorized to delete this certification");
        }

        certificationRepository.delete(certification);
    }

    // ============================================================
    // ADMIN - ADD CERTIFICATION
    // ============================================================

    @Override
    public CertificationResponse addCertification(
            AdminCertificationRequest request,
            MultipartFile file) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: "
                                        + request.getUserId()));

        Skill skill = null;

        if (request.getSkillId() != null) {
            skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Skill not found with id: "
                                            + request.getSkillId()));
        }

        String fileUrl = null;

        if (file != null && !file.isEmpty()) {
            fileUrl = uploadFile(file);
        }

        Certification certification = Certification.builder()
                .user(user)
                .skill(skill)
                .name(request.getName())
                .issuer(request.getIssuer())
                .credentialUrl(request.getCredentialUrl())
                .fileUrl(fileUrl)
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .build();

        Certification saved =
                certificationRepository.save(certification);

        return mapToResponse(saved);
    }

    // ============================================================
    // ADMIN - GET ALL CERTIFICATIONS
    // ============================================================

    @Override
    public List<CertificationResponse> getAllCertifications() {

        return certificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ============================================================
    // ADMIN - GET CERTIFICATION BY ID
    // ============================================================

    @Override
    public CertificationResponse getCertificationById(Long id) {

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found with id: " + id));

        return mapToResponse(certification);
    }

    // ============================================================
    // ADMIN - UPDATE CERTIFICATION
    // ============================================================

    @Override
    public CertificationResponse updateCertification(
            Long id,
            AdminCertificationRequest request,
            MultipartFile file) {

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found with id: " + id));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: "
                                        + request.getUserId()));

        Skill skill = null;

        if (request.getSkillId() != null) {
            skill = skillRepository.findById(request.getSkillId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Skill not found with id: "
                                            + request.getSkillId()));
        }

        if (file != null && !file.isEmpty()) {
            certification.setFileUrl(uploadFile(file));
        }

        certification.setUser(user);
        certification.setSkill(skill);
        certification.setName(request.getName());
        certification.setIssuer(request.getIssuer());
        certification.setCredentialUrl(request.getCredentialUrl());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());

        Certification updated =
                certificationRepository.save(certification);

        return mapToResponse(updated);
    }

    // ============================================================
    // ADMIN - DELETE CERTIFICATION
    // ============================================================

    @Override
    public void deleteCertificationById(Long id) {

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found with id: " + id));

        certificationRepository.delete(certification);
    }

    // ============================================================
    // GET CURRENT LOGGED-IN USER
    // ============================================================

    private User getCurrentUser() {

        Object principal =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        String email;

        if (principal instanceof UserDetails userDetails) {

            email = userDetails.getUsername();

        } else {

            email = principal.toString();
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Logged-in user not found"));
    }

    // ============================================================
    // CLOUDINARY FILE UPLOAD
    // ============================================================

    private String uploadFile(MultipartFile file) {

        try {

            return cloudinaryService.uploadFile(file);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to upload certification file",
                    e
            );
        }
    }

    // ============================================================
    // ENTITY -> RESPONSE DTO
    // ============================================================

    private CertificationResponse mapToResponse(
            Certification certification) {

        return CertificationResponse.builder()

                .id(certification.getId())

                // USER
                .userId(
                        certification.getUser() != null
                                ? certification.getUser().getId()
                                : null
                )

                /*
                 * IMPORTANT:
                 * User entity contains fullName, NOT name.
                 */
                .userName(
                        certification.getUser() != null
                                ? certification.getUser().getFullName()
                                : null
                )

                // SKILL
                .skillId(
                        certification.getSkill() != null
                                ? certification.getSkill().getId()
                                : null
                )

                .skillName(
                        certification.getSkill() != null
                                ? certification.getSkill().getName()
                                : null
                )

                // CERTIFICATION
                .name(certification.getName())

                .issuer(certification.getIssuer())

                .credentialUrl(
                        certification.getCredentialUrl()
                )

                .fileUrl(
                        certification.getFileUrl()
                )

                .issueDate(
                        certification.getIssueDate()
                )

                .expiryDate(
                        certification.getExpiryDate()
                )

                .build();
    }
}