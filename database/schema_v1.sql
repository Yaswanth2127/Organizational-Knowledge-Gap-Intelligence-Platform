-- Roles Table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    employee_code VARCHAR(30) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT REFERENCES roles(role_id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication Table
CREATE TABLE auth_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    access_token TEXT,
    refresh_token TEXT,
    expiry_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    description TEXT
);

-- Competency Levels Table
CREATE TABLE competency_levels (
    competency_id SERIAL PRIMARY KEY,
    level_name VARCHAR(50),
    level_value INT
);

-- Employee Skills Table
CREATE TABLE employee_skills (
    employee_skill_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    skill_id INT REFERENCES skills(skill_id),
    competency_id INT REFERENCES competency_levels(competency_id),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);