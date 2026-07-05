package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.CertificationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {
    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;
    private final SkillRepository skillRepository;

    @Override
    public CertificationResponse addCertification(CertificationRequest certificationRequest) {
        User user = userRepository.findById(certificationRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Certification certification = Certification.builder()
                .name(certificationRequest.getName())
                .issuer(certificationRequest.getIssuer())
                .credentialUrl(certificationRequest.getCredentialUrl())
                .fileUrl(certificationRequest.getFileUrl())
                .issueDate(certificationRequest.getIssueDate())
                .expiryDate(certificationRequest.getExpiryDate())
                .user(user)
                .build();

        if (certificationRequest.getSkillId() != null) {

            Skill skill = skillRepository.findById(certificationRequest.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);

        } else {

            certification.setSkill(null);
        }

        certification = certificationRepository.save(certification);

        Long skillId = certification.getSkill() != null
                ? certification.getSkill().getId()
                : null;


        return new CertificationResponse(
                certification.getId(),
                certification.getUser().getId(),
                skillId,
                certification.getName(),
                certification.getIssuer(),
                certification.getCredentialUrl(),
                certification.getFileUrl(),
                certification.getIssueDate(),
                certification.getExpiryDate());
    }

    @Override
    public List<CertificationResponse> getAllCertifications() {
        return certificationRepository.findAll()
                .stream()
                .map(certification -> new CertificationResponse(
                        certification.getId(),
                        certification.getUser().getId(),
                        certification.getSkill() != null
                                ? certification.getSkill().getId()
                                : null,
                        certification.getName(),
                        certification.getIssuer(),
                        certification.getCredentialUrl(),
                        certification.getFileUrl(),
                        certification.getIssueDate(),
                        certification.getExpiryDate()
                ))
                .toList();
    }

    @Override
    public CertificationResponse getCertificationById(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        Long skillId = certification.getSkill() != null
                ? certification.getSkill().getId()
                : null;

        return new CertificationResponse(
                certification.getId(),
                certification.getUser().getId(),
                skillId,
                certification.getName(),
                certification.getIssuer(),
                certification.getCredentialUrl(),
                certification.getFileUrl(),
                certification.getIssueDate(),
                certification.getExpiryDate()
        );
    }

    @Override
    public CertificationResponse updateCertification(Long id, CertificationRequest certificationRequest) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        User user = userRepository.findById(certificationRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        certification.setUser(user);

        if (certificationRequest.getSkillId() != null) {

            Skill skill = skillRepository.findById(certificationRequest.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            certification.setSkill(skill);

        } else {

            certification.setSkill(null);
        }

        certification.setName(certificationRequest.getName());
        certification.setIssuer(certificationRequest.getIssuer());
        certification.setCredentialUrl(certificationRequest.getCredentialUrl());
        certification.setFileUrl(certificationRequest.getFileUrl());
        certification.setIssueDate(certificationRequest.getIssueDate());
        certification.setExpiryDate(certificationRequest.getExpiryDate());

        certification = certificationRepository.save(certification);

        Long skillId = certification.getSkill() != null
                ? certification.getSkill().getId()
                : null;

        return new CertificationResponse(
                certification.getId(),
                certification.getUser().getId(),
                skillId,
                certification.getName(),
                certification.getIssuer(),
                certification.getCredentialUrl(),
                certification.getFileUrl(),
                certification.getIssueDate(),
                certification.getExpiryDate()
        );
    }

    @Override
    public void deleteCertificationById(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new RuntimeException("Certification not found");
        }

        certificationRepository.deleteById(id);

    }
}


