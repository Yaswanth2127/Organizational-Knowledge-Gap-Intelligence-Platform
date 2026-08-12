package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeArticle;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KnowledgeArticleRepository extends JpaRepository<KnowledgeArticle,Long> {
    @EntityGraph(attributePaths = {"author","skill"})
    List<KnowledgeArticle> findByAuthor(User author);

    @EntityGraph(attributePaths = {"author","skill"})
    List<KnowledgeArticle> findBySkill(Skill skill);

    @EntityGraph(attributePaths = {"author","skill"})
    List<KnowledgeArticle> findByTitleContainingIgnoreCase(String title);

    @Override
    @EntityGraph(attributePaths = {"author","skill"})
    Optional<KnowledgeArticle> findById(Long aLong);

    @Override
    @EntityGraph(attributePaths = {"author","skill"})
    List<KnowledgeArticle> findAll();

    @EntityGraph(attributePaths = {"author", "skill"})
    Optional<KnowledgeArticle> findByIdAndAuthorId(
            Long id,
            Long authorId
    );
}
