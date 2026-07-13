-- ============================================================
-- 1. Insert Departments (if not exist) – name is UNIQUE
-- ============================================================
INSERT INTO departments (name, description) VALUES 
    ('Engineering', 'Software development and infrastructure'),
    ('Product', 'Product management and design'),
    ('Data Science', 'Data analytics and AI'),
    ('Human Resources', 'People operations')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 2. Insert Job Roles – no unique constraint, so use WHERE NOT EXISTS
-- ============================================================
INSERT INTO job_roles (title, department_id, description)
SELECT 'Software Engineer', id, 'Develops and maintains applications'
FROM departments WHERE name = 'Engineering'
AND NOT EXISTS (SELECT 1 FROM job_roles WHERE title = 'Software Engineer')
UNION ALL
SELECT 'Product Manager', id, 'Owns product roadmap'
FROM departments WHERE name = 'Product'
AND NOT EXISTS (SELECT 1 FROM job_roles WHERE title = 'Product Manager')
UNION ALL
SELECT 'Data Analyst', id, 'Analyzes business data'
FROM departments WHERE name = 'Data Science'
AND NOT EXISTS (SELECT 1 FROM job_roles WHERE title = 'Data Analyst')
UNION ALL
SELECT 'HR Specialist', id, 'Manages employee relations'
FROM departments WHERE name = 'Human Resources'
AND NOT EXISTS (SELECT 1 FROM job_roles WHERE title = 'HR Specialist');

-- ============================================================
-- 3. Insert Roles – name is UNIQUE
-- ============================================================
INSERT INTO roles (name) VALUES 
    ('EMPLOYEE'),
    ('MANAGER'),
    ('HR_SPECIALIST'),
    ('DEPARTMENT_HEAD'),
    ('LND_ADMIN'),
    ('SYS_ADMIN')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 4. Insert Admin User – email is UNIQUE
-- ============================================================
INSERT INTO users (
    full_name,
    email,
    password_hash,
    department_id,
    job_role_id,
    manager_id,
    phone_number,
    profile_image_url,
    is_active,
    email_verified
) VALUES (
    'Admin User',
    'admin@company.com',
    '$2a$10$Kjenk/SZ3RXADih3YLMuYujrzcladxQMAYUL5H25EyEhoPTXEQS16',
    (SELECT id FROM departments WHERE name = 'Engineering'),
    (SELECT id FROM job_roles WHERE title = 'Software Engineer'),
    NULL,
    '+91-98765-43210',
    NULL,
    true,
    true
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    department_id = EXCLUDED.department_id,
    job_role_id = EXCLUDED.job_role_id,
    is_active = EXCLUDED.is_active,
    email_verified = EXCLUDED.email_verified;

-- ============================================================
-- 5. Assign SYS_ADMIN role
-- ============================================================
INSERT INTO user_roles (user_id, role_id)
SELECT 
    u.id,
    r.id
FROM 
    users u,
    roles r
WHERE 
    u.email = 'admin@company.com'
    AND r.name = 'SYS_ADMIN'
ON CONFLICT DO NOTHING;

-- ============================================================
-- 6. Skill Categories – name is UNIQUE
-- ============================================================
INSERT INTO skill_categories (name) VALUES 
    ('Technical'),
    ('Soft Skills'),
    ('Database'),
    ('Cloud')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 7. Skills – name is UNIQUE
-- ============================================================
INSERT INTO skills (name, category_id, description, is_active) VALUES
    ('React.js', (SELECT id FROM skill_categories WHERE name = 'Technical'), 'Frontend library', true),
    ('Spring Boot', (SELECT id FROM skill_categories WHERE name = 'Technical'), 'Java microservices', true),
    ('PostgreSQL', (SELECT id FROM skill_categories WHERE name = 'Database'), 'Relational database', true),
    ('AWS', (SELECT id FROM skill_categories WHERE name = 'Cloud'), 'Amazon Web Services', true),
    ('Python', (SELECT id FROM skill_categories WHERE name = 'Technical'), 'Programming language', true),
    ('Docker', (SELECT id FROM skill_categories WHERE name = 'Cloud'), 'Containerization', true),
    ('SQL', (SELECT id FROM skill_categories WHERE name = 'Database'), 'Structured Query Language', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 8. Assign skills to admin user – use a variable to avoid ambiguity
-- ============================================================
DO $$
DECLARE
    v_user_id BIGINT;
BEGIN
    SELECT id INTO v_user_id FROM users WHERE email = 'admin@company.com';
    
    IF v_user_id IS NOT NULL THEN
        -- Using WHERE NOT EXISTS to avoid duplicate key errors
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'ADVANCED', 'ADVANCED'
        FROM skills WHERE name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'React.js'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE'
        FROM skills WHERE name = 'Spring Boot'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Spring Boot'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'BEGINNER', 'BEGINNER'
        FROM skills WHERE name = 'PostgreSQL'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'PostgreSQL'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'EXPERT', 'EXPERT'
        FROM skills WHERE name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'AWS'));
    END IF;
END $$;

-- ============================================================
-- 9. Add certifications
-- ============================================================
DO $$
DECLARE
    v_user_id BIGINT;
BEGIN
    SELECT id INTO v_user_id FROM users WHERE email = 'admin@company.com';
    
    IF v_user_id IS NOT NULL THEN
        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, id, 'AWS Certified Solutions Architect', 'Amazon', '2024-01-15', '2027-01-15'
        FROM skills WHERE name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'AWS Certified Solutions Architect');

        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, id, 'React Certification', 'Meta', '2023-08-10', '2025-08-10'
        FROM skills WHERE name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'React Certification');
    END IF;
END $$;

-- ============================================================
-- 10. Verify everything
-- ============================================================
SELECT 
    u.id,
    u.full_name,
    u.email,
    d.name AS department,
    jr.title AS job_role,
    (SELECT STRING_AGG(r.name, ', ') FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = u.id) AS roles,
    u.is_active
FROM users u
LEFT JOIN departments d ON u.department_id = d.id
LEFT JOIN job_roles jr ON u.job_role_id = jr.id
WHERE u.email = 'admin@company.com';