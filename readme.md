IntiCivi — Civic Complaint Tracking System
1. Project Description
IntiCivi is a full-stack civic complaint submission and tracking system developed to reduce complaint processing time and improve transparency between citizens and administrators.
Users can register, log in, submit complaints with details, and track complaint status.
Admins can view all complaints and update their status.
The system is built using React for frontend and Java Spring Boot for backend with JWT authentication.

2. Features
User registration and login
JWT based authentication
Submit complaint with details
View complaint list
Track complaint status
Admin can view all complaints
Admin can update complaint status
REST API based backend
Component-based frontend UI

3. Tech Stack
Frontend
React + Vite
CSS-in-JS / basic styling

Backend
Java 17
Spring Boot
Spring Security + JWT

Database
H2 (for demo / testing)
PostgreSQL (for production)
MongoDB / Firebase (optional)
MinIO (for file / image storage)

Tools
GitHub (version control)
npm (frontend build)

4. Repository Structure
project-root/
│
├── frontend_website/
├── backend_website/
├── README.md


5. Requirements
Backend requirements
Java 17+
Maven 3.6+

Frontend requirements
Node.js 18+
npm 10+ or yarn

Database (optional)
PostgreSQL

Files included
backend → pom.xml
frontend → package.json
These files contain all dependencies.|


6. Steps to Run the Project
Clone the repository
git clone <repo_link>
cd project-root

6.1 Run Frontend
    cd frontend_website
    npm install
    npm run dev

Open:
http://localhost:5173
Check API URL in:
src/api/authApi.js
It should be:
http://localhost:8080


6.2 Run Backend
    cd backend_website
    mvn clean install
    mvn spring-boot:run

Backend runs at:
http://localhost:8080

H2 Console:
http://localhost:8080/h2-console

JDBC URL:
jdbc:h2:mem:testdb

User:
sa
Password:
(empty)


7. API Endpoints

Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

Complaints
POST /api/complaints
GET  /api/complaints
GET  /api/complaints/{id}

Admin
GET /api/complaints/admin/all
PUT /api/complaints/{id}/status

JWT header
Authorization: Bearer

Project runs using H2 database by default
PostgreSQL can be configured in application.properties
JWT authentication is enabled
Repo should run without errors after clone
Make sure backend runs before frontend