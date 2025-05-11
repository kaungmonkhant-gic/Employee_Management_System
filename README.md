Employee_Management_System
Overview
Employee Management System is a full-stack application designed to manage employee records, salaries, attendance, and more. The project uses modern technologies and tools to ensure scalability, maintainability, and efficient development.

Tech Stack
Backend: Java (JDK 21)

Frontend: React (Node.js v18)

Database: MySQL (managed using MySQL Workbench)

Version Control: Git & GitHub

Containerization: Docker & Docker Compose

Frontend Setup (React)
If you're running the frontend outside Docker, follow these steps:

bash
Copy
Edit
cd react_frontend
npm install
npm start
The application will be available at:
http://localhost:3000

Docker Setup
To run the full app (backend + frontend) in Docker:

bash
Copy
Edit
docker-compose up --build -d
Make sure Docker is installed and running.

Test the App
After starting the container, access the app via:
http://localhost:3000