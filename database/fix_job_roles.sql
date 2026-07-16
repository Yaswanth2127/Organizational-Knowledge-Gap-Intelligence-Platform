-- ================================================================
-- 1. Insert job roles (only if not already present)
-- ================================================================
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

-- ================================================================
-- 2. Update users with the correct job_role_id
-- ================================================================

-- Admin User → Software Engineer
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Software Engineer')
WHERE email = 'admin@company.com';

-- Yaswanth → Software Engineer
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Software Engineer')
WHERE email = 'yaswanth@company.com';

-- Sundharam → Software Engineer
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Software Engineer')
WHERE email = 'sundharam@company.com';

-- Aanesh → Product Manager
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Product Manager')
WHERE email = 'aanesh@company.com';

-- Kavya → Product Manager
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Product Manager')
WHERE email = 'kavya@company.com';

-- Krishna → Data Analyst
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Data Analyst')
WHERE email = 'krishna@company.com';

-- Megavarshini (HR) → HR Specialist
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'HR Specialist')
WHERE email = 'megavarshini@company.com';

-- Neha → HR Specialist
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'HR Specialist')
WHERE email = 'neha@company.com';

-- For the two personal emails, assign a default role (e.g., Software Engineer)
UPDATE users SET job_role_id = (SELECT id FROM job_roles WHERE title = 'Software Engineer')
WHERE email IN ('megavarshini3012@gmail.com', 'megavarshini.test@gmail.com');

-- (Optional) If some users still have no department, assign Engineering temporarily
UPDATE users SET department_id = (SELECT id FROM departments WHERE name = 'Engineering')
WHERE department_id IS NULL;

-- ================================================================
-- 3. Verify final data
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