



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

CREATE TABLE skill_gaps (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id            BIGINT NOT NULL REFERENCES skills(id),
    framework_id        BIGINT REFERENCES competency_frameworks(id),
    required_level      proficiency_level NOT NULL,
    current_level       proficiency_level NOT NULL,
    gap_score           NUMERIC(5,2) NOT NULL CHECK (gap_score >= 0),
    severity            gap_severity NOT NULL,
    status              VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    detected_at         TIMESTAMP NOT NULL DEFAULT now(),
    resolved_at         TIMESTAMP
);

CREATE TABLE department_gap_summary (
    id                      BIGSERIAL PRIMARY KEY,
    department_id           BIGINT NOT NULL REFERENCES departments(id),
    skill_id                BIGINT NOT NULL REFERENCES skills(id),
    avg_gap_score           NUMERIC(5,2) NOT NULL,
    employees_with_gap      INT NOT NULL DEFAULT 0,
    period_start            DATE NOT NULL,
    period_end              DATE NOT NULL,
    created_at              TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE courses (
    id                  BIGSERIAL PRIMARY KEY,
    title               VARCHAR(200) NOT NULL,
    description         TEXT,
    skill_id            BIGINT REFERENCES skills(id),
    source              course_source NOT NULL DEFAULT 'INTERNAL',
    provider            VARCHAR(150),
    external_url        VARCHAR(500),
    duration_hours      NUMERIC(5,2),
    difficulty          VARCHAR(20),
    thumbnail_url       VARCHAR(500),
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE learning_paths (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    generated_by        VARCHAR(20) DEFAULT 'AI',
    status              VARCHAR(20) DEFAULT 'ACTIVE',
    created_at          TIMESTAMP DEFAULT now()
);


CREATE TABLE learning_path_courses (
    id                      BIGSERIAL PRIMARY KEY,
    learning_path_id        BIGINT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    course_id               BIGINT NOT NULL REFERENCES courses(id),
    sequence_order          INT NOT NULL,
    estimated_days          INT,
    UNIQUE(learning_path_id, sequence_order)
);

CREATE TABLE enrollments (
    id                      BIGSERIAL PRIMARY KEY,
    user_id                 BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id               BIGINT NOT NULL REFERENCES courses(id),
    status                  training_status NOT NULL DEFAULT 'NOT_STARTED',
    progress_percent        NUMERIC(5,2) DEFAULT 0
                                CHECK(progress_percent>=0
                                  AND progress_percent<=100),
    enrolled_at             TIMESTAMP DEFAULT now(),
    last_accessed_at        TIMESTAMP,
    completed_at            TIMESTAMP,
    UNIQUE(user_id, course_id)
);


CREATE TABLE assessments (
    id                      BIGSERIAL PRIMARY KEY,
    user_id                 BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id               BIGINT NOT NULL REFERENCES courses(id),
    skill_id                BIGINT NOT NULL REFERENCES skills(id),
    title                   VARCHAR(200),
    score                   NUMERIC(5,2),
    passing_score           NUMERIC(5,2) DEFAULT 70,
    passed                  BOOLEAN NOT NULL,
    assessed_at             TIMESTAMP DEFAULT now()
);

CREATE TABLE recommendations (

    id                  BIGSERIAL PRIMARY KEY,

    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    course_id           BIGINT NOT NULL REFERENCES courses(id),

    skill_gap_id        BIGINT REFERENCES skill_gaps(id),

    relevance_score     NUMERIC(5,2),

    reason              TEXT,

    accepted            BOOLEAN DEFAULT FALSE,
    generated_at        TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, course_id, skill_gap_id)
);



SELECT column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_name = 'employee_skills';


select * from competency_frameworks;
SELECT id, full_name, department_id, job_role_id
FROM users
WHERE department_id = 3;

INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
VALUES
(8,11,'ADVANCED',1.00),
(8,12,'ADVANCED',1.00),
(8,13,'ADVANCED',1.00),
(8,8,'ADVANCED',1.00),
(8,9,'ADVANCED',1.00);

select * from recommendations;
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'recommendations';

select * from skill_gaps;
select * from learning_paths;
select * from recommendations;
select * from learning_paths;