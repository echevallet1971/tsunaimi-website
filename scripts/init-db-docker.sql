-- Docker PostgreSQL Initialization Script
-- This script should be run from inside the Docker container
-- Usage: docker exec -i [postgres-container-name] psql -U postgres -f /path/to/init-db-docker.sql

-- Create staging database if it doesn't exist
SELECT 'CREATE DATABASE tsunaimi_staging'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tsunaimi_staging')\gexec

-- Connect to staging database
\c tsunaimi_staging

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(255),
    interest VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    notes TEXT,
    phone_number VARCHAR(50)
); 