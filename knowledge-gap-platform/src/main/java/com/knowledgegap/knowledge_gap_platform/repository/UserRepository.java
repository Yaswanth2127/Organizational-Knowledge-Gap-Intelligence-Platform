//package com.knowledgegap.knowledge_gap_platform.repository;
//
//import com.knowledgegap.knowledge_gap_platform.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import org.springframework.data.domain.Pageable;
//import java.util.List;
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Long> {
//
//    Optional<User> findByEmail(String email);
//
//    boolean existsByEmail(String email);
//    @Query("""
//SELECT u
//FROM User u
//LEFT JOIN FETCH u.department
//LEFT JOIN FETCH u.jobRole
//LEFT JOIN FETCH u.manager
//ORDER BY u.createdAt DESC
//""")
//    List<User> findRecentUsers(Pageable pageable);
//
//    @Query("""
//    SELECT u
//    FROM User u
//    LEFT JOIN FETCH u.department
//    LEFT JOIN FETCH u.jobRole
//    LEFT JOIN FETCH u.manager
//    """)
//    List<User> findAllWithDepartmentAndRole();
//
//}

package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findTop7ByOrderByCreatedAtDesc();

}
