FROM maven:3.8.3-openjdk-17 AS builder
COPY api api
WORKDIR /api
RUN mvn clean install -DskipTests=true

FROM eclipse-temurin:17-jdk-alpine AS finalizer
VOLUME /tmp
COPY --from=builder /api/target/*.jar app.jar
EXPOSE 80
ENTRYPOINT ["java","-jar","/app.jar"]
