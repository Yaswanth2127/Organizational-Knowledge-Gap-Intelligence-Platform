package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeGap;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KnowledgeGapRepository extends JpaRepository<KnowledgeGap, Long> {

    Optional<KnowledgeGap> findByUserAndSkill(User user, Skill skill);

    List<KnowledgeGap> findByUser(User user);

    List<KnowledgeGap> findBySkill(Skill skill);
}