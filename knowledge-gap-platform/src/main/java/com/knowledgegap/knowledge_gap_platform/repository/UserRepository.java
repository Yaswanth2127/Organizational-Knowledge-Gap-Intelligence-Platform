package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.JobRole;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    @EntityGraph(attributePaths = {"department", "jobRole", "manager"})
    Optional<User> findById(Long id);

    @EntityGraph(attributePaths = {"department", "jobRole", "manager"})
    Optional<User> findByEmail(String email);


    boolean existsByEmail(String email);

    @Override
    @EntityGraph(attributePaths = {"department","jobRole","manager"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"department","jobRole","manager"})
    List<User> findTop7ByOrderByCreatedAtDesc();


    @EntityGraph(attributePaths = {"department","jobRole","manager"})
    List<User> findAllByDepartmentId(Long departmentId);

    @EntityGraph(attributePaths = {"department","jobRole","manager"})
    List<User> findByJobRole(JobRole jobRole);

}
