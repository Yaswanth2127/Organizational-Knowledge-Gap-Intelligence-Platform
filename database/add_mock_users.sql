-- ================================================================
-- 1. Insert Additional Users
--    (passwords all = 'password123', same hash)
-- ================================================================
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
) VALUES
    (
        'Megavarshini',
        'megavarshini@company.com',
        '$2a$10$gW0rR0ctiZ9WaVo1c.niJeP9rVR9hpkaM8Z8o8nUCQyWidoAoGeOa', --mega123
        (SELECT id FROM departments WHERE name = 'Human Resources'),
        (SELECT id FROM job_roles WHERE title = 'HR Specialist'),
        (SELECT id FROM users WHERE email = 'admin@company.com'),
        '+91-98765-43216',
        NULL,
        true,
        true
    ),
    (
        'Yaswanth',
        'yaswanth@company.com',
        '$2a$10$c/P4VF2WFhC6UQtoF.ukqOdTaOzjtY09a6i80WtPv/Ic0FA.wUUdK', --yaswanth123
        (SELECT id FROM departments WHERE name = 'Engineering'),
        (SELECT id FROM job_roles WHERE title = 'Software Engineer'),
        (SELECT id FROM users WHERE email = 'admin@company.com'),
        '+91-98765-43217',
        NULL,
        true,
        true
    ),
    (
        'Aanesh',
        'aanesh@company.com',
        '$2a$10$B5.Cg9FvxS.C57AS31hqoe5yC5HbO/clsY0MtthWu.qg5rhAEXhyK', --aanesh123
        (SELECT id FROM departments WHERE name = 'Product'),
        (SELECT id FROM job_roles WHERE title = 'Product Manager'),
        (SELECT id FROM users WHERE email = 'yaswanth@company.com'),
        '+91-98765-43218',
        NULL,
        true,
        true
    ),
    (
        'Krishna',
        'krishna@company.com',
        '$2a$10$Kx.fsVVlJlwaIrHEyKkpvODAlIPsZUQcjo3lfpCpqa09jezv7B4Te', --krishna123
        (SELECT id FROM departments WHERE name = 'Data Science'),
        (SELECT id FROM job_roles WHERE title = 'Data Analyst'),
        (SELECT id FROM users WHERE email = 'admin@company.com'),
        '+91-98765-43219',
        NULL,
        true,
        true
    ),
    (
        'Sundharam',
        'sundharam@company.com',
        '$2a$10$JB3Hz5D7h5huJ/8vbvThPu.5Swr5A5fKYV5f5pgdpOxh2NHATEpSa', --sundharam123
        (SELECT id FROM departments WHERE name = 'Engineering'),
        (SELECT id FROM job_roles WHERE title = 'Software Engineer'),
        (SELECT id FROM users WHERE email = 'yaswanth@company.com'),
        '+91-98765-43220',
        NULL,
        true,
        true
    ),
    (
        'Neha',
        'neha@company.com',
        '$2a$10$hWft/IAZCYIuw9/moVCoCuhz0YqMYemWUhI8cJtckvBe4SFmpjkCW', --neha123
        (SELECT id FROM departments WHERE name = 'Human Resources'),
        (SELECT id FROM job_roles WHERE title = 'HR Specialist'),
        (SELECT id FROM users WHERE email = 'megavarshini@company.com'),
        '+91-98765-43221',
        NULL,
        true,
        true
    ),
    (
        'Kavya',
        'kavya@company.com',
        '$2a$10$cjYPrpFtPpJG0KZf3IYJC./ApXZZna1s9RECP/QqWNvDMN/POBpQW', --kavya123
        (SELECT id FROM departments WHERE name = 'Product'),
        (SELECT id FROM job_roles WHERE title = 'Product Manager'),
        (SELECT id FROM users WHERE email = 'aanesh@company.com'),
        '+91-98765-43222',
        NULL,
        true,
        true
    )
ON CONFLICT (email) DO NOTHING;

-- ================================================================
-- 2. Assign Roles (mix of EMPLOYEE, MANAGER, HR_SPECIALIST)
-- ================================================================
DO $$
DECLARE
    v_user_id BIGINT;
    v_role_id BIGINT;
BEGIN
    -- Megavarshini → HR_SPECIALIST
    SELECT id INTO v_user_id FROM users WHERE email = 'megavarshini@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'HR_SPECIALIST';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Yaswanth → MANAGER
    SELECT id INTO v_user_id FROM users WHERE email = 'yaswanth@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'MANAGER';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Aanesh → EMPLOYEE
    SELECT id INTO v_user_id FROM users WHERE email = 'aanesh@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'EMPLOYEE';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Krishna → EMPLOYEE
    SELECT id INTO v_user_id FROM users WHERE email = 'krishna@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'EMPLOYEE';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Sundharam → EMPLOYEE
    SELECT id INTO v_user_id FROM users WHERE email = 'sundharam@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'EMPLOYEE';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Neha → HR_SPECIALIST
    SELECT id INTO v_user_id FROM users WHERE email = 'neha@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'HR_SPECIALIST';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;

    -- Kavya → EMPLOYEE
    SELECT id INTO v_user_id FROM users WHERE email = 'kavya@company.com';
    SELECT id INTO v_role_id FROM roles WHERE name = 'EMPLOYEE';
    IF v_user_id IS NOT NULL AND v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id) VALUES (v_user_id, v_role_id) ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- ================================================================
-- 3. Assign Employee Skills (varied ratings)
-- ================================================================
DO $$
DECLARE
    v_user_id BIGINT;
BEGIN
    -- Megavarshini: SQL (Expert), Spring Boot (Intermediate)
    SELECT id INTO v_user_id FROM users WHERE email = 'megavarshini@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'EXPERT', 'EXPERT' FROM skills WHERE name = 'SQL'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'SQL'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE' FROM skills WHERE name = 'Spring Boot'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Spring Boot'));
    END IF;

    -- Yaswanth: React.js (Expert), Docker (Advanced)
    SELECT id INTO v_user_id FROM users WHERE email = 'yaswanth@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'EXPERT', 'EXPERT' FROM skills WHERE name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'React.js'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'ADVANCED', 'ADVANCED' FROM skills WHERE name = 'Docker'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Docker'));
    END IF;

    -- Aanesh: Python (Advanced), PostgreSQL (Intermediate)
    SELECT id INTO v_user_id FROM users WHERE email = 'aanesh@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'ADVANCED', 'ADVANCED' FROM skills WHERE name = 'Python'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Python'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE' FROM skills WHERE name = 'PostgreSQL'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'PostgreSQL'));
    END IF;

    -- Krishna: AWS (Intermediate), SQL (Beginner)
    SELECT id INTO v_user_id FROM users WHERE email = 'krishna@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE' FROM skills WHERE name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'AWS'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'BEGINNER', 'BEGINNER' FROM skills WHERE name = 'SQL'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'SQL'));
    END IF;

    -- Sundharam: Spring Boot (Expert), Docker (Advanced)
    SELECT id INTO v_user_id FROM users WHERE email = 'sundharam@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'EXPERT', 'EXPERT' FROM skills WHERE name = 'Spring Boot'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Spring Boot'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'ADVANCED', 'ADVANCED' FROM skills WHERE name = 'Docker'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Docker'));
    END IF;

    -- Neha: React.js (Beginner), Python (Intermediate)
    SELECT id INTO v_user_id FROM users WHERE email = 'neha@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'BEGINNER', 'BEGINNER' FROM skills WHERE name = 'React.js'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'React.js'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE' FROM skills WHERE name = 'Python'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'Python'));
    END IF;

    -- Kavya: PostgreSQL (Advanced), AWS (Intermediate)
    SELECT id INTO v_user_id FROM users WHERE email = 'kavya@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'ADVANCED', 'ADVANCED' FROM skills WHERE name = 'PostgreSQL'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'PostgreSQL'));

        INSERT INTO employee_skills (user_id, skill_id, self_rating, final_rating)
        SELECT v_user_id, id, 'INTERMEDIATE', 'INTERMEDIATE' FROM skills WHERE name = 'AWS'
        AND NOT EXISTS (SELECT 1 FROM employee_skills WHERE user_id = v_user_id AND skill_id = (SELECT id FROM skills WHERE name = 'AWS'));
    END IF;
END $$;

-- ================================================================
-- 4. Add Certifications for some users
-- ================================================================
DO $$
DECLARE
    v_user_id BIGINT;
BEGIN
    -- Megavarshini: HR Certification
    SELECT id INTO v_user_id FROM users WHERE email = 'megavarshini@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, NULL, 'SHRM Certified Professional', 'SHRM', '2024-03-01', '2027-03-01'
        WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'SHRM Certified Professional');
    END IF;

    -- Yaswanth: AWS Developer
    SELECT id INTO v_user_id FROM users WHERE email = 'yaswanth@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, (SELECT id FROM skills WHERE name = 'AWS'), 'AWS Certified Developer', 'Amazon', '2024-06-15', '2027-06-15'
        WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'AWS Certified Developer');
    END IF;

    -- Sundharam: Spring Professional
    SELECT id INTO v_user_id FROM users WHERE email = 'sundharam@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, (SELECT id FROM skills WHERE name = 'Spring Boot'), 'Spring Professional', 'VMware', '2024-09-10', '2027-09-10'
        WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'Spring Professional');
    END IF;

    -- Neha: Python for Data Science
    SELECT id INTO v_user_id FROM users WHERE email = 'neha@company.com';
    IF v_user_id IS NOT NULL THEN
        INSERT INTO certifications (user_id, skill_id, name, issuer, issue_date, expiry_date)
        SELECT v_user_id, (SELECT id FROM skills WHERE name = 'Python'), 'Python for Data Science', 'Coursera', '2024-11-20', NULL
        WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE user_id = v_user_id AND name = 'Python for Data Science');
    END IF;
END $$;

-- ================================================================
-- 5. Final Verification: list all users with roles
-- ================================================================
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
ORDER BY u.id;