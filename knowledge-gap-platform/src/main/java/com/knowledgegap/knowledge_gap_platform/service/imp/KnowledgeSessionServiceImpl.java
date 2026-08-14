package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionResponse;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeSessionRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class KnowledgeSessionServiceImpl implements KnowledgeSessionService {
    private final UserRoleRepository userRoleRepository;
    private final SkillRepository skillRepository;
    private final KnowledgeSessionRepository knowledgeSessionRepository;
    private final AuthenticationService authenticationService;


    @Override
    public KnowledgeSessionResponse createSession(KnowledgeSessionRequest request) {
        User host = authenticationService.getCurrentUser();

        Skill topicSkill = skillRepository.findById(request.getTopicSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found"));

        if (!request.getEndedAt().isAfter(request.getScheduledAt())) {
            throw new IllegalArgumentException(
                    "Session end time must be after start time"
            );
        }

        KnowledgeSession knowledgeSession = KnowledgeSession.builder()
                .host(host)
                .title(request.getTitle())
                .topicSkill(topicSkill)
                .scheduledAt(request.getScheduledAt())
                .locationLink(request.getLocationLink())
                .endedAt(request.getEndedAt())
                .build();

        return mapToKnowledgeSessionResponse(
                knowledgeSessionRepository.save(knowledgeSession)
        );
    }

    @Override
    public KnowledgeSessionResponse updateSession(Long id, KnowledgeSessionRequest request) {
        KnowledgeSession knowledgeSession = knowledgeSessionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Knowledge session not found"));
        if (!request.getEndedAt().isAfter(request.getScheduledAt())) {
            throw new IllegalArgumentException(
                    "Session end time must be after start time"
            );
        }

        User currentUser = authenticationService.getCurrentUser();
        boolean isHost = knowledgeSession.getHost()
                .getId()
                .equals(currentUser.getId());

        boolean isAdmin = userRoleRepository
                .findByUserId(currentUser.getId())
                .stream()
                .anyMatch(userRole ->
                        "ADMIN".equalsIgnoreCase(
                                userRole.getRole().getName()
                        )
                );

        if (!isHost && !isAdmin) {
            throw new AccessDeniedException(
                    "You are not authorized to edit this session"
            );
        }

        Skill topicSkill = skillRepository.findById(request.getTopicSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found"));

        knowledgeSession.setTitle(request.getTitle());
        knowledgeSession.setTopicSkill(topicSkill);
        knowledgeSession.setScheduledAt(request.getScheduledAt());
        knowledgeSession.setEndedAt(request.getEndedAt());
        knowledgeSession.setLocationLink(request.getLocationLink());

        return mapToKnowledgeSessionResponse(
                knowledgeSessionRepository.save(knowledgeSession)
        );
    }

    @Override
    public void deleteSession(Long id) {
        KnowledgeSession knowledgeSession = knowledgeSessionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Knowledge session not found"));
        User currentUser=authenticationService.getCurrentUser();
        boolean isHost = knowledgeSession.getHost()
                .getId()
                .equals(currentUser.getId());

        boolean isAdmin = userRoleRepository
                .findByUserId(currentUser.getId())
                .stream()
                .anyMatch(userRole ->
                        "ADMIN".equalsIgnoreCase(
                                userRole.getRole().getName()
                        )
                );

        if (!isHost && !isAdmin) {
            throw new AccessDeniedException(
                    "You are not authorized to delete this session"
            );
        }
        knowledgeSessionRepository.deleteById(id);
    }

    @Override
    public KnowledgeSessionResponse getSessionById(Long id) {
        KnowledgeSession knowledgeSession=knowledgeSessionRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Session not found"));

        return mapToKnowledgeSessionResponse(knowledgeSession);
    }

    @Override
    public List<KnowledgeSessionResponse> getSessionsByHost(Long hostId) {
        return knowledgeSessionRepository.findByHostId(hostId)
                .stream().map(this::mapToKnowledgeSessionResponse).toList();
    }

    @Override
    public List<KnowledgeSessionResponse> getSessionsBySkill(Long skillId) {
        return knowledgeSessionRepository.findByTopicSkillId(skillId)
                .stream().map(this::mapToKnowledgeSessionResponse).toList();
    }

    @Override
    public List<KnowledgeSessionResponse> getSessionsByStatus(SessionStatus status) {
        return knowledgeSessionRepository.findByStatus(status)
                .stream().map(this::mapToKnowledgeSessionResponse).toList();
    }
    @Override
    public List<KnowledgeSessionResponse> getAllSessions() {

        return knowledgeSessionRepository.findAll()
                .stream()
                .map(this::mapToKnowledgeSessionResponse)
                .toList();
    }

    private KnowledgeSessionResponse mapToKnowledgeSessionResponse(KnowledgeSession knowledgeSession){
        return KnowledgeSessionResponse.builder()
                .id(knowledgeSession.getId())
                .hostId(knowledgeSession.getHost().getId())
                .hostName(knowledgeSession.getHost().getFullName())
                .title(knowledgeSession.getTitle())
                .topicSkillId(knowledgeSession.getTopicSkill().getId())
                .skillName(knowledgeSession.getTopicSkill().getName())
                .scheduledAt(knowledgeSession.getScheduledAt())
                .locationLink(knowledgeSession.getLocationLink())
                .status(knowledgeSession.getStatus())
                .createdAt(knowledgeSession.getCreatedAt())
                .updatedAt(knowledgeSession.getUpdatedAt())
                .endedAt(knowledgeSession.getEndedAt())
                .build();

    }
}
