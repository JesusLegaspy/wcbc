# Build stage for React app
FROM node:latest as react-build
WORKDIR /app
COPY ./react-frontend/package*.json ./
RUN npm ci
COPY ./react-frontend/ ./
RUN npm run build

# Build stage for Spring Boot app
FROM maven:3.9.4-eclipse-temurin-21 as spring-build
WORKDIR /app
COPY ./java-backend/pom.xml ./
RUN mvn dependency:go-offline
COPY ./java-backend/ ./
RUN mvn package -DskipTests

# Final stage: Create the final image
FROM eclipse-temurin:21-jdk-alpine
RUN addgroup -S demo && adduser -S demo -G demo
USER demo
COPY --from=react-build /app/build /static
COPY --from=spring-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]