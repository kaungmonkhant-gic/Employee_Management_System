# Updated versions
ARG MVN_VERSION=3.9.6
ARG JDK_VERSION=21

# Use correct Maven image
FROM maven:${MVN_VERSION}-eclipse-temurin-${JDK_VERSION} AS maven_tool_chain_cache
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:tree

COPY ./pom.xml /tmp/
COPY ./src /tmp/src/
WORKDIR /tmp/
RUN mvn clean install -DskipTests


# Use distroless image for production
FROM gcr.io/distroless/java21:nonroot

USER nonroot:nonroot

COPY --from=maven_tool_chain_cache --chown=nonroot:nonroot /tmp/target/ems_project-0.0.1-SNAPSHOT.jar /ems_project-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "/ems_project-0.0.1-SNAPSHOT.jar"]
