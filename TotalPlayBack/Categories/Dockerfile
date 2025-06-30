# Buildear
FROM gradle:8.14-jdk AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

# Ejecutar en docker
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]