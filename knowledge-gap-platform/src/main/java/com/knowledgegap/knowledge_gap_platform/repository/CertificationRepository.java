package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CertificationRepository extends JpaRepository<Certification,Long> {

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    Optional<Certification> findById(Long aLong);

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    List<Certification> findAll();

    @EntityGraph(attributePaths = {"user","skill"})
    List<Certification> findByUser(User user);

    Integer countByUserId(Long userId);
}
