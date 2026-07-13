-- ================================================================
-- 1. Insert Competency Frameworks for each job role (if not exist)
-- ================================================================
INSERT INTO competency_frameworks (job_role_id, department_id, version, is_active, created_by)
SELECT 
    jr.id,
    jr.department_id,
    1,
    true,
    (SELECT id FROM users WHERE email = 'admin@company.com')
FROM job_roles jr
WHERE NOT EXISTS (
    SELECT 1 FROM competency_frameworks cf 
    WHERE cf.job_role_id = jr.id AND cf.is_active = true
);

-- ================================================================
-- 2. Framework Required Skills (using WHERE NOT EXISTS to avoid conflict)
-- ================================================================

-- Software Engineer Framework
DO $$
DECLARE
    v_framework_id BIGINT;
BEGIN
    SELECT cf.id INTO v_framework_id 
    FROM competency_frameworks cf
    JOIN job_roles jr ON cf.job_role_id = jr.id
    WHERE jr.title = 'Software Engineer' AND cf.is_active = true;

    IF v_framework_id IS NOT NULL THEN
        -- React.js
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'ADVANCED', 1.5
        FROM skills s WHERE s.name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        -- Spring Boot
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 1.5
        FROM skills s WHERE s.name = 'Spring Boot'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        -- PostgreSQL
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 1.0
        FROM skills s WHERE s.name = 'PostgreSQL'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        -- AWS
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'ADVANCED', 1.0
        FROM skills s WHERE s.name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        -- Docker
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 0.8
        FROM skills s WHERE s.name = 'Docker'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);
    END IF;
END $$;

-- Product Manager Framework
DO $$
DECLARE
    v_framework_id BIGINT;
BEGIN
    SELECT cf.id INTO v_framework_id 
    FROM competency_frameworks cf
    JOIN job_roles jr ON cf.job_role_id = jr.id
    WHERE jr.title = 'Product Manager' AND cf.is_active = true;

    IF v_framework_id IS NOT NULL THEN
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 0.8
        FROM skills s WHERE s.name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 0.8
        FROM skills s WHERE s.name = 'Python'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'BEGINNER', 0.5
        FROM skills s WHERE s.name = 'SQL'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'BEGINNER', 0.3
        FROM skills s WHERE s.name = 'Docker'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);
    END IF;
END $$;

-- Data Analyst Framework
DO $$
DECLARE
    v_framework_id BIGINT;
BEGIN
    SELECT cf.id INTO v_framework_id 
    FROM competency_frameworks cf
    JOIN job_roles jr ON cf.job_role_id = jr.id
    WHERE jr.title = 'Data Analyst' AND cf.is_active = true;

    IF v_framework_id IS NOT NULL THEN
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'ADVANCED', 1.8
        FROM skills s WHERE s.name = 'Python'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'ADVANCED', 1.5
        FROM skills s WHERE s.name = 'SQL'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'INTERMEDIATE', 1.0
        FROM skills s WHERE s.name = 'PostgreSQL'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'BEGINNER', 0.4
        FROM skills s WHERE s.name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);
    END IF;
END $$;

-- HR Specialist Framework
DO $$
DECLARE
    v_framework_id BIGINT;
BEGIN
    SELECT cf.id INTO v_framework_id 
    FROM competency_frameworks cf
    JOIN job_roles jr ON cf.job_role_id = jr.id
    WHERE jr.title = 'HR Specialist' AND cf.is_active = true;

    IF v_framework_id IS NOT NULL THEN
        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'UNAWARE', 0.0
        FROM skills s WHERE s.name = 'SQL'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'BEGINNER', 0.2
        FROM skills s WHERE s.name = 'Python'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);

        INSERT INTO framework_required_skills (framework_id, skill_id, required_proficiency, weight)
        SELECT v_framework_id, s.id, 'UNAWARE', 0.0
        FROM skills s WHERE s.name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM framework_required_skills WHERE framework_id = v_framework_id AND skill_id = s.id);
    END IF;
END $$;

-- ================================================================
-- 3. Verify frameworks and required skills
-- ================================================================
SELECT 
    jr.title AS job_role,
    COUNT(DISTINCT cf.id) AS frameworks,
    COUNT(frs.id) AS required_skills
FROM job_roles jr
LEFT JOIN competency_frameworks cf ON cf.job_role_id = jr.id AND cf.is_active = true
LEFT JOIN framework_required_skills frs ON frs.framework_id = cf.id
GROUP BY jr.title
ORDER BY jr.title;