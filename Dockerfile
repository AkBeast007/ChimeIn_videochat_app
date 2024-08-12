FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/videochat-0.0.1-SNAPSHOT.jar videochat.jar
ENTRYPOINT ["java","-jar","/videochat.jar"]
EXPOSE 8080