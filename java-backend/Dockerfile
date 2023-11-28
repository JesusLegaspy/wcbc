FROM eclipse-temurin:21-jdk-alpine
RUN addgroup -S demo && adduser -S demo -G demo
USER demo
EXPOSE 8080
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]