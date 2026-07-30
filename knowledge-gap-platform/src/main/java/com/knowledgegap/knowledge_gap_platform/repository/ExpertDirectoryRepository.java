package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.ExpertDirectory;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpertDirectoryRepository extends JpaRepository<ExpertDirectory,Long> {

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    Optional<ExpertDirectory> findById(Long aLong);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findBySkillId(Long skillId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findByExpertiseLevel(ProficiencyLevel expertiseLevel);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findBySkillIdAndExpertiseLevel(
            Long skillId,
            ProficiencyLevel expertiseLevel
    );


    boolean existsByUserIdAndSkillId(Long userId, Long skillId);

    @EntityGraph(attributePaths = {"user","skill"})
    Optional<ExpertDirectory> findByUserIdAndSkillId(Long userId, Long skillId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findAllByOrderByEndorsementCountDesc();

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findBySkillIdOrderByEndorsementCountDesc(Long skillId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findBySkillIdAndExpertiseLevelOrderByEndorsementCountDesc(
            Long skillId,
            ProficiencyLevel expertiseLevel
    );

    @EntityGraph(attributePaths = {"user","skill"})
    List<ExpertDirectory> findTop5ByOrderByEndorsementCountDesc();
}
