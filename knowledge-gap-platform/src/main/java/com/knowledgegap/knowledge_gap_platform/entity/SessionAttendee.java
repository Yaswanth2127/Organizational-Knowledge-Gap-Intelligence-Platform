package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Entity
@Table(name = "session_attendees",uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","session_id"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionAttendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id",nullable = false)
    private KnowledgeSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @Builder.Default
    @JdbcTypeCode((SqlTypes.NAMED_ENUM))
    @Enumerated(EnumType.STRING)
    @Column(name = "attendance_status",nullable = false)
    private AttendanceStatus attendanceStatus=AttendanceStatus.REGISTERED;

    @Min(1)
    @Max(5)
    @Column(name = "feedback_rating" )
    private Integer feedbackRating;

    @Column(name = "feedback_text")
    private String  feedbackText;
}
