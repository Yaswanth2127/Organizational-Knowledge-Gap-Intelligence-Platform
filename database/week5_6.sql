-- ============================================================
-- Organizational Knowledge Gap Intelligence Platform
-- WEEK 5 & 6 SCHEMA — Milestone 3
-- Covers:
--   1. Knowledge Sharing & Mentorship
--   2. Notifications & Alerts
-- Analytics dashboards and reports are generated from existing
-- transactional data (no additional tables required).
-- Depends on:
--   schema_week1_2.sql
--   schema_week3_4.sql
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE mentorship_status AS ENUM
('PENDING','ACTIVE','COMPLETED','CANCELLED');

CREATE TYPE session_status AS ENUM
('SCHEDULED','COMPLETED','CANCELLED');

CREATE TYPE attendance_status AS ENUM
('REGISTERED','ATTENDED','ABSENT');

CREATE TYPE notification_channel AS ENUM
('EMAIL','SMS','PUSH','IN_APP');

CREATE TYPE notification_status AS ENUM
('PENDING','SENT','FAILED','READ');

-- ============================================================
-- 1. EXPERT DIRECTORY
-- ============================================================

CREATE TABLE expert_directory
(
    id                  BIGSERIAL PRIMARY KEY,

    user_id             BIGINT NOT NULL
                        REFERENCES users(id)
                        ON DELETE CASCADE,

    skill_id            BIGINT NOT NULL
                        REFERENCES skills(id),

    expertise_level     proficiency_level NOT NULL,

    endorsement_count   INT NOT NULL DEFAULT 0,

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, skill_id)
);

-- ============================================================
-- 2. MENTORSHIP MATCHES
-- ============================================================

CREATE TABLE mentorship_matches
(
    id                  BIGSERIAL PRIMARY KEY,

    mentor_id           BIGINT NOT NULL
                        REFERENCES users(id),

    mentee_id           BIGINT NOT NULL
                        REFERENCES users(id),

    skill_id            BIGINT
                        REFERENCES skills(id),

    status              mentorship_status
                        NOT NULL DEFAULT 'PENDING',

    matched_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    ended_at            TIMESTAMP,

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (mentor_id <> mentee_id)
);

-- ============================================================
-- 3. KNOWLEDGE SESSIONS
-- ============================================================

CREATE TABLE knowledge_sessions
(
    id                  BIGSERIAL PRIMARY KEY,

    host_id             BIGINT NOT NULL
                        REFERENCES users(id),

    title               VARCHAR(200) NOT NULL,

    topic_skill_id      BIGINT
                        REFERENCES skills(id),

    scheduled_at        TIMESTAMP NOT NULL,

    location_link       VARCHAR(500),

    status              session_status
                        NOT NULL DEFAULT 'SCHEDULED',

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. SESSION ATTENDEES
-- ============================================================

CREATE TABLE session_attendees
(
    id                  BIGSERIAL PRIMARY KEY,

    session_id          BIGINT NOT NULL
                        REFERENCES knowledge_sessions(id)
                        ON DELETE CASCADE,

    user_id             BIGINT NOT NULL
                        REFERENCES users(id),

    attendance_status   attendance_status
                        NOT NULL DEFAULT 'REGISTERED',

    feedback_rating     INT
                        CHECK (feedback_rating BETWEEN 1 AND 5),

    feedback_text       TEXT,

    UNIQUE(session_id, user_id)
);

-- ============================================================
-- 5. KNOWLEDGE ARTICLES
-- ============================================================

CREATE TABLE knowledge_articles
(
    id                  BIGSERIAL PRIMARY KEY,

    author_id           BIGINT NOT NULL
                        REFERENCES users(id),

    title               VARCHAR(200) NOT NULL,

    content             TEXT,

    skill_id            BIGINT
                        REFERENCES skills(id),

    resource_url        VARCHAR(500),

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications
(
    id                  BIGSERIAL PRIMARY KEY,

    user_id             BIGINT NOT NULL
                        REFERENCES users(id)
                        ON DELETE CASCADE,

    type                VARCHAR(50) NOT NULL,
    -- Examples:
    -- GAP_ALERT
    -- TRAINING_DEADLINE
    -- RECOMMENDATION
    -- MENTORSHIP
    -- SESSION_REMINDER
    -- MILESTONE

    channel             notification_channel NOT NULL,

    title               VARCHAR(200) NOT NULL,

    message             TEXT NOT NULL,

    status              notification_status
                        NOT NULL DEFAULT 'PENDING',

    read_at             TIMESTAMP,

    expires_at          TIMESTAMP,

    created_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_expert_directory_skill
ON expert_directory(skill_id);

CREATE INDEX idx_expert_directory_user
ON expert_directory(user_id);

CREATE INDEX idx_mentorship_mentor
ON mentorship_matches(mentor_id);

CREATE INDEX idx_mentorship_mentee
ON mentorship_matches(mentee_id);

CREATE INDEX idx_mentorship_status
ON mentorship_matches(status);

CREATE INDEX idx_knowledge_sessions_host
ON knowledge_sessions(host_id);

CREATE INDEX idx_knowledge_sessions_date
ON knowledge_sessions(scheduled_at);

CREATE INDEX idx_session_attendees_session
ON session_attendees(session_id);

CREATE INDEX idx_session_attendees_use
ON session_attendees(user_id);

CREATE INDEX idx_knowledge_articles_skill
ON knowledge_articles(skill_id);

CREATE INDEX idx_knowledge_articles_author
ON knowledge_articles(author_id);

CREATE INDEX idx_notifications_user_status
ON notifications(user_id, status);

CREATE INDEX idx_notifications_created
ON notifications(created_at);