package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    @Override
    @EntityGraph(attributePaths = {"user", "skill", "course", "assessment"})
    Optional<Certification> findById(Long id);

    @Override
    @EntityGraph(attributePaths = {"user", "skill", "course", "assessment"})
    List<Certification> findAll();

    @EntityGraph(attributePaths = {"user", "skill", "course", "assessment"})
    List<Certification> findByUser(User user);

    Integer countByUserId(Long userId);
}