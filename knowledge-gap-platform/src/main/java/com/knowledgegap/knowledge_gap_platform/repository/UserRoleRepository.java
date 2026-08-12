package com.knowledgegap.knowledge_gap_platform.repository;


import com.knowledgegap.knowledge_gap_platform.entity.UserRole;
import com.knowledgegap.knowledge_gap_platform.entity.UserRoleId;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {


    @EntityGraph(attributePaths = {"role"})
    List<UserRole> findByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId);

    boolean existsByUserIdAndRoleId(
            Long userId,
            Long roleId
    );

}
