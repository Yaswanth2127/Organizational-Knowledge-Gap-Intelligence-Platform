-- ============================================================
-- Organizational Knowledge Gap Intelligence Platform
-- WEEK 3 & 4 SCHEMA — Milestone 2
-- Covers: Knowledge Gap Analysis, Training Recommendation
-- Depends on: schema_week1_2.sql (users, skills, competency_frameworks, etc.)
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================
CREATE TYPE gap_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE training_status AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CERTIFIED', 'EXPIRED');
CREATE TYPE course_source AS ENUM ('INTERNAL', 'COURSERA', 'UDEMY', 'LINKEDIN_LEARNING', 'OTHER');

-- ============================================================
-- 1. KNOWLEDGE GAP ANALYSIS
-- ============================================================

CREATE TABLE skill_gaps (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id            BIGINT NOT NULL REFERENCES skills(id),
    framework_id        BIGINT REFERENCES competency_frameworks(id),
    required_level      proficiency_level NOT NULL,
    current_level       proficiency_level NOT NULL,
    gap_score           NUMERIC(5,2) NOT NULL,        -- numeric distance between levels (0-4 scale)
    severity            gap_severity NOT NULL,
    detected_at         TIMESTAMP NOT NULL DEFAULT now(),
    resolved_at         TIMESTAMP
);

CREATE TABLE department_gap_summary (
    id                  BIGSERIAL PRIMARY KEY,
    department_id       BIGINT NOT NULL REFERENCES departments(id),
    skill_id            BIGINT NOT NULL REFERENCES skills(id),
    avg_gap_score       NUMERIC(5,2) NOT NULL,
    employees_with_gap  INT NOT NULL DEFAULT 0,
    period_start        DATE NOT NULL,
    period_end          DATE NOT NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. TRAINING, COURSES & RECOMMENDATIONS
-- ============================================================

CREATE TABLE courses (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    skill_id        BIGINT REFERENCES skills(id),
    source          course_source NOT NULL DEFAULT 'INTERNAL',
    external_url    VARCHAR(500),
    duration_hours  NUMERIC(5,2),
    provider        VARCHAR(150),
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE learning_paths (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    generated_by    VARCHAR(20) NOT NULL DEFAULT 'AI', -- AI | MANUAL
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE learning_path_courses (
    id                  BIGSERIAL PRIMARY KEY,
    learning_path_id    BIGINT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    course_id           BIGINT NOT NULL REFERENCES courses(id),
    sequence_order      INT NOT NULL DEFAULT 1
);

CREATE TABLE enrollments (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           BIGINT NOT NULL REFERENCES courses(id),
    status              training_status NOT NULL DEFAULT 'NOT_STARTED',
    progress_percent    NUMERIC(5,2) NOT NULL DEFAULT 0,
    enrolled_at         TIMESTAMP NOT NULL DEFAULT now(),
    completed_at        TIMESTAMP,
    UNIQUE (user_id, course_id)
);

CREATE TABLE recommendations (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       BIGINT NOT NULL REFERENCES courses(id),
    skill_gap_id    BIGINT REFERENCES skill_gaps(id),
    relevance_score NUMERIC(5,2) NOT NULL,
    reason          TEXT,                             -- LLM-generated explanation
    generated_at    TIMESTAMP NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_skill_gaps_user ON skill_gaps(user_id);
CREATE INDEX idx_skill_gaps_severity ON skill_gaps(severity);
CREATE INDEX idx_dept_gap_summary_dept ON department_gap_summary(department_id);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_learning_path_courses_path ON learning_path_courses(learning_path_id);
