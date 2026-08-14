package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchRequest;
import com.knowledgegap.knowledge_gap_platform.dto.MentorshipMatchResponse;
import com.knowledgegap.knowledge_gap_platform.entity.MentorshipMatch;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.MentorshipMatchRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRoleRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.MentorshipMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MentorshipMatchServiceImpl
        implements MentorshipMatchService {

    private final MentorshipMatchRepository mentorshipMatchRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserRoleRepository userRoleRepository;
    private final AuthenticationService authenticationService;


    // =========================================================
    // CREATE
    // =========================================================

    @Override
    public MentorshipMatchResponse createMatch(
            MentorshipMatchRequest request) {

        User currentUser = authenticationService.getCurrentUser();

        /*
         * For now, only ADMIN can manually create
         * a mentor-mentee match.
         *
         * Employee-side mentorship request can be
         * added separately later.
         */
        if (!isAdmin(currentUser)) {
            throw new AccessDeniedException(
                    "Only administrators can create mentorship matches."
            );
        }

        if (request.getMentorId() == null
                || request.getMenteeId() == null
                || request.getSkillId() == null) {

            throw new IllegalArgumentException(
                    "Mentor, mentee and skill are required."
            );
        }

        if (request.getMentorId()
                .equals(request.getMenteeId())) {

            throw new IllegalArgumentException(
                    "Mentor and mentee cannot be the same."
            );
        }


        // Prevent active/pending duplicate

        List<MentorshipMatch> existing =
                mentorshipMatchRepository
                        .findByMentorIdAndMenteeIdAndSkillIdAndStatusIn(
                                request.getMentorId(),
                                request.getMenteeId(),
                                request.getSkillId(),
                                List.of(
                                        MentorshipStatus.PENDING,
                                        MentorshipStatus.ACTIVE
                                )
                        );

        if (!existing.isEmpty()) {
            throw new IllegalArgumentException(
                    "An active or pending mentorship already exists."
            );
        }


        User mentor = userRepository
                .findById(request.getMentorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentor details not found"
                        ));


        User mentee = userRepository
                .findById(request.getMenteeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentee details not found"
                        ));


        Skill skill = skillRepository
                .findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Skill details not found"
                        ));


        /*
         * Every newly created match starts as PENDING.
         */
        MentorshipMatch match =
                MentorshipMatch.builder()
                        .mentor(mentor)
                        .mentee(mentee)
                        .skill(skill)
                        .status(MentorshipStatus.PENDING)
                        .build();


        return mapToResponse(
                mentorshipMatchRepository.save(match)
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @Override
    public MentorshipMatchResponse updateMatch(
            Long id,
            MentorshipMatchRequest request) {

        User currentUser = authenticationService.getCurrentUser();

        if (!isAdmin(currentUser)) {
            throw new AccessDeniedException(
                    "Only administrators can edit mentorship matches."
            );
        }


        MentorshipMatch match =
                mentorshipMatchRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mentorship details not found"
                                ));


        /*
         * Don't edit completed/cancelled relationships.
         */
        if (match.getStatus() == MentorshipStatus.COMPLETED
                || match.getStatus() == MentorshipStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "Completed or cancelled mentorship cannot be edited."
            );
        }


        if (request.getMentorId()
                .equals(request.getMenteeId())) {

            throw new IllegalArgumentException(
                    "Mentor and mentee cannot be the same."
            );
        }


        List<MentorshipMatch> existing =
                mentorshipMatchRepository
                        .findByMentorIdAndMenteeIdAndSkillIdAndStatusIn(
                                request.getMentorId(),
                                request.getMenteeId(),
                                request.getSkillId(),
                                List.of(
                                        MentorshipStatus.PENDING,
                                        MentorshipStatus.ACTIVE
                                )
                        );


        boolean duplicate =
                existing.stream()
                        .anyMatch(existingMatch ->
                                !existingMatch
                                        .getId()
                                        .equals(id)
                        );


        if (duplicate) {
            throw new IllegalArgumentException(
                    "An active or pending mentorship already exists."
            );
        }


        User mentor = userRepository
                .findById(request.getMentorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentor details not found"
                        ));


        User mentee = userRepository
                .findById(request.getMenteeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentee details not found"
                        ));


        Skill skill = skillRepository
                .findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Skill details not found"
                        ));


        match.setMentor(mentor);
        match.setMentee(mentee);
        match.setSkill(skill);


        /*
         * Don't allow normal update to change status.
         *
         * Status must go through:
         * acceptMatch()
         * completeMatch()
         * cancelMatch()
         */
        return mapToResponse(
                mentorshipMatchRepository.save(match)
        );
    }


    // =========================================================
    // DELETE
    // =========================================================

    @Override
    public void deleteMatch(Long id) {

        User currentUser = authenticationService.getCurrentUser();

        if (!isAdmin(currentUser)) {
            throw new AccessDeniedException(
                    "Only administrators can delete mentorship matches."
            );
        }


        MentorshipMatch match =
                mentorshipMatchRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mentorship details not found"
                                ));


        /*
         * Prefer cancellation for active relationships.
         * Hard delete is mainly for administrative cleanup.
         */
        if (match.getStatus() == MentorshipStatus.ACTIVE) {
            throw new IllegalArgumentException(
                    "Active mentorship cannot be deleted. Cancel it instead."
            );
        }


        mentorshipMatchRepository.delete(match);
    }


    // =========================================================
    // ACCEPT
    // =========================================================

    @Override
    public MentorshipMatchResponse acceptMatch(Long id) {

        User currentUser = authenticationService.getCurrentUser();

        MentorshipMatch match = getMatch(id);


        /*
         * Only the mentor or admin can accept.
         */
        if (!isAdmin(currentUser)
                && !match.getMentor()
                .getId()
                .equals(currentUser.getId())) {

            throw new AccessDeniedException(
                    "Only the mentor or administrator can accept this mentorship."
            );
        }


        if (match.getStatus() != MentorshipStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Only pending mentorships can be accepted."
            );
        }


        match.setStatus(MentorshipStatus.ACTIVE);

        match.setMatchedAt(
                LocalDateTime.now()
        );

        match.setEndedAt(null);


        return mapToResponse(
                mentorshipMatchRepository.save(match)
        );
    }


    // =========================================================
    // COMPLETE
    // =========================================================

    @Override
    public MentorshipMatchResponse completeMatch(Long id) {

        User currentUser = authenticationService.getCurrentUser();

        MentorshipMatch match = getMatch(id);


        /*
         * Mentor, mentee or admin can complete.
         */
        boolean isParticipant =
                match.getMentor()
                        .getId()
                        .equals(currentUser.getId())
                        ||
                        match.getMentee()
                                .getId()
                                .equals(currentUser.getId());


        if (!isAdmin(currentUser) && !isParticipant) {
            throw new AccessDeniedException(
                    "You are not part of this mentorship."
            );
        }


        if (match.getStatus() != MentorshipStatus.ACTIVE) {
            throw new IllegalArgumentException(
                    "Only active mentorships can be completed."
            );
        }


        match.setStatus(
                MentorshipStatus.COMPLETED
        );

        match.setEndedAt(
                LocalDateTime.now()
        );


        return mapToResponse(
                mentorshipMatchRepository.save(match)
        );
    }


    // =========================================================
    // CANCEL
    // =========================================================

    @Override
    public MentorshipMatchResponse cancelMatch(Long id) {

        User currentUser = authenticationService.getCurrentUser();

        MentorshipMatch match = getMatch(id);


        boolean isParticipant =
                match.getMentor()
                        .getId()
                        .equals(currentUser.getId())
                        ||
                        match.getMentee()
                                .getId()
                                .equals(currentUser.getId());


        if (!isAdmin(currentUser) && !isParticipant) {
            throw new AccessDeniedException(
                    "You are not part of this mentorship."
            );
        }


        if (match.getStatus() != MentorshipStatus.PENDING
                && match.getStatus() != MentorshipStatus.ACTIVE) {

            throw new IllegalArgumentException(
                    "Only pending or active mentorships can be cancelled."
            );
        }


        match.setStatus(
                MentorshipStatus.CANCELLED
        );

        match.setEndedAt(
                LocalDateTime.now()
        );


        return mapToResponse(
                mentorshipMatchRepository.save(match)
        );
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public MentorshipMatchResponse getMatchById(Long id) {

        return mapToResponse(getMatch(id));
    }


    // =========================================================
    // GET ALL - ADMIN
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MentorshipMatchResponse> getAllMatches() {

        User currentUser = authenticationService.getCurrentUser();

        if (!isAdmin(currentUser)) {
            throw new AccessDeniedException(
                    "Only administrators can view all mentorship matches."
            );
        }


        return mentorshipMatchRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY MENTOR
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MentorshipMatchResponse> getMatchesByMentor(
            Long mentorId) {

        return mentorshipMatchRepository
                .findByMentorId(mentorId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY MENTEE
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MentorshipMatchResponse> getMatchesByMentee(
            Long menteeId) {

        return mentorshipMatchRepository
                .findByMenteeId(menteeId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY SKILL
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MentorshipMatchResponse> getMatchesBySkill(
            Long skillId) {

        return mentorshipMatchRepository
                .findBySkillId(skillId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY STATUS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<MentorshipMatchResponse> getMatchesByStatus(
            MentorshipStatus status) {

        return mentorshipMatchRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // HELPER
    // =========================================================

    private MentorshipMatch getMatch(Long id) {

        return mentorshipMatchRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentorship details not found"
                        ));
    }


    private boolean isAdmin(User user) {

        return userRoleRepository
                .findByUserId(user.getId())
                .stream()
                .anyMatch(userRole ->
                        "SYS_ADMIN".equalsIgnoreCase(
                                userRole.getRole().getName()
                        )
                );
    }


    // =========================================================
    // RESPONSE MAPPING
    // =========================================================

    private MentorshipMatchResponse mapToResponse(
            MentorshipMatch match) {

        return MentorshipMatchResponse.builder()

                .id(match.getId())

                .mentorId(
                        match.getMentor().getId()
                )

                .mentorName(
                        match.getMentor().getFullName()
                )

                .menteeId(
                        match.getMentee().getId()
                )

                .menteeName(
                        match.getMentee().getFullName()
                )

                .skillId(
                        match.getSkill().getId()
                )

                .skillName(
                        match.getSkill().getName()
                )

                .status(
                        match.getStatus()
                )

                .matchedAt(
                        match.getMatchedAt()
                )

                .endedAt(
                        match.getEndedAt()
                )

                .createdAt(
                        match.getCreatedAt()
                )

                .updatedAt(
                        match.getUpdatedAt()
                )

                .build();
    }
}