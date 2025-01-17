# Dockerfile for Backend
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/ems_project-0.0.1-SNAPSHOT.jar /app/ems_project-0.0.1-SNAPSHOT.jar

# Expose the backend port
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "ems_project-0.0.1-SNAPSHOT.jar"]
