# IntiCivi Backend

This is the Java Spring Boot backend for the IntiCivi complaint tracking system.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Setup

1. Ensure you have Java and Maven installed.

2. Navigate to the backend_website directory.

3. Run `mvn clean install` to build the project.

4. Run `mvn spring-boot:run` to start the server.

The server will run on http://localhost:8080

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get JWT token
- GET /api/auth/me - Get current user info (requires Bearer token)

### Complaints

- POST /api/complaints - Create a new complaint (requires Bearer token)
- GET /api/complaints - Get user's complaints (requires Bearer token)
- GET /api/complaints/{id} - Get specific complaint (requires Bearer token)
- GET /api/complaints/admin/all - Get all complaints (admin only)
- PUT /api/complaints/{id}/status - Update complaint status (admin only)

## Database

Uses H2 in-memory database. Access console at http://localhost:8080/h2-console

## CORS

Configured to allow requests from http://localhost:5173 (Vite dev server)