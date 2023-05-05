FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app
COPY . /workspace/app
COPY ../api-schema /workspace/app
RUN ./gradlew clean build -x test
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp

ARG DEPENDENCY=/workspace/app/build/dependency

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.spinobe.SpinoBeApplicationKt"]