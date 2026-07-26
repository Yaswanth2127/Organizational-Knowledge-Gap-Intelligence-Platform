package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Recommendation;
import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByUser(User user);

    List<Recommendation> findByCourse(Course course);

    List<Recommendation> findBySkillGap(SkillGap skillGap);

    Optional<Recommendation> findByUserAndCourseAndSkillGap(
            User user,
            Course course,
            SkillGap skillGap
    );


    @Modifying
    @Transactional
    @Query("DELETE FROM Recommendation r WHERE r.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    void deleteAllBySkillGapIn(List<SkillGap> gaps);
}