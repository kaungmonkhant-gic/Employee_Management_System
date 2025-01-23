# Use a Maven base image for building the Java app
FROM maven:3.8-openjdk-17 AS build
 
# Set the working directory in the container
WORKDIR /app
 
# Copy the pom.xml and install dependencies
COPY pom.xml ./
 
# Download dependencies
RUN mvn dependency:go-offline
 
# Copy the source code
COPY src ./src
 
 
# Expose the application port
EXPOSE 8081
 
# Run the application
CMD ["java", "-jar", "target/Java-backend-0.0.1-SNAPSHOT.jar"]