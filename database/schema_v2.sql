-- ============================================================
-- Organizational Knowledge Gap Intelligence Platform
-- WEEK 1 & 2 SCHEMA — Milestone 1
-- Covers: Auth & RBAC, Employee Profile & Skill Inventory,
--         Competency Framework
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================
CREATE TYPE proficiency_level AS ENUM ('UNAWARE', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- ============================================================
-- 1. ORGANIZATION STRUCTURE
-- ============================================================

CREATE TABLE departments (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL UNIQUE,
    description     TEXT,
    parent_dept_id  BIGINT REFERENCES departments(id),
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE job_roles (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(150) NOT NULL,
    department_id   BIGINT REFERENCES departments(id),
    description     TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. AUTH & ROLE-BASED ACCESS CONTROL
-- ============================================================

CREATE TABLE roles (
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL UNIQUE
    -- values: EMPLOYEE, MANAGER, HR_SPECIALIST, DEPARTMENT_HEAD, LND_ADMIN, SYS_ADMIN
);

CREATE TABLE users (
    id                  BIGSERIAL PRIMARY KEY,
    full_name           VARCHAR(150) NOT NULL,
    email               VARCHAR(150) NOT NULL UNIQUE,
    password_hash       VARCHAR(255),               -- nullable if OAuth-only later
    department_id       BIGINT REFERENCES departments(id),
    job_role_id         BIGINT REFERENCES job_roles(id),
    manager_id          BIGINT REFERENCES users(id),
    phone_number        VARCHAR(20),
    profile_image_url   VARCHAR(500),
    is_active           BOOLEAN NOT NULL DEFAULT true,
    email_verified      BOOLEAN NOT NULL DEFAULT false,
    created_at          TIMESTAMP NOT NULL DEFAULT now(),
    updated_at          TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE user_roles (
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id     BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ============================================================
-- 3. EMPLOYEE PROFILE & SKILL INVENTORY
-- ============================================================

CREATE TABLE skill_categories (
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE skills (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL UNIQUE,
    category_id     BIGINT REFERENCES skill_categories(id),
    description     TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE employee_skills (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id            BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    self_rating         proficiency_level,
    peer_rating         proficiency_level,
    manager_rating      proficiency_level,
    final_rating        proficiency_level,          -- resolved/consensus rating
    last_assessed_at    TIMESTAMP,
    created_at          TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (user_id, skill_id)
);

CREATE TABLE certifications (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        BIGINT REFERENCES skills(id),
    name            VARCHAR(200) NOT NULL,
    issuer          VARCHAR(150),
    credential_url  VARCHAR(500),
    file_url        VARCHAR(500),                   -- S3/Cloudinary link
    issue_date      DATE,
    expiry_date     DATE,
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. COMPETENCY FRAMEWORK
-- ============================================================

CREATE TABLE competency_frameworks (
    id              BIGSERIAL PRIMARY KEY,
    job_role_id     BIGINT NOT NULL REFERENCES job_roles(id),
    department_id   BIGINT REFERENCES departments(id),
    version         INT NOT NULL DEFAULT 1,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_by      BIGINT REFERENCES users(id),
    created_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE framework_required_skills (
    id                      BIGSERIAL PRIMARY KEY,
    framework_id            BIGINT NOT NULL REFERENCES competency_frameworks(id) ON DELETE CASCADE,
    skill_id                 BIGINT NOT NULL REFERENCES skills(id),
    required_proficiency     proficiency_level NOT NULL,
    weight                   NUMERIC(4,2) DEFAULT 1.0,
    UNIQUE (framework_id, skill_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_users_manager ON users(manager_id);
CREATE INDEX idx_employee_skills_user ON employee_skills(user_id);
CREATE INDEX idx_employee_skills_skill ON employee_skills(skill_id);
CREATE INDEX idx_certifications_user ON certifications(user_id);
CREATE INDEX idx_framework_skills_framework ON framework_required_skills(framework_id);

-- ============================================================
-- SEED DATA — required roles for RBAC to function from day one
-- ============================================================

INSERT INTO roles (name) VALUES
    ('EMPLOYEE'),
    ('MANAGER'),
    ('HR_SPECIALIST'),
    ('DEPARTMENT_HEAD'),
    ('LND_ADMIN'),
    ('SYS_ADMIN');

