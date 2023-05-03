import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.10"
	id("io.spring.dependency-management") version "1.0.15.RELEASE"
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
	id("org.openapi.generator") version "5.4.0"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-actuator")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

apply(plugin = "org.openapi.generator")

val spec = "$rootDir/api-schema/openapi.yaml"
val generatedSourceDir = "$buildDir/gen-src"

openApiGenerate {
	generatorName.set("kotlin-spring")
	inputSpec.set(spec)
	outputDir.set(generatedSourceDir)
	apiPackage.set("com.example.spinobe.openapi.api")
	modelPackage.set("com.example.spinobe.openapi.model")
	globalProperties.set(
		mapOf(
			"apis" to "",
			"models" to ""
		)
	)
	configOptions.set(
		mapOf(
			"swaggerAnnotations" to "false",
			"useBeanValidation" to "true",
			"serviceInterface" to "true",
			"exceptionHandler" to "true",
			"gradleBuildFile" to "false",
			"useTags" to "true"
		)
	)
}

openApiValidate {
	inputSpec.set(spec)
}

kotlin.sourceSets.main {
	kotlin.srcDir("$generatedSourceDir/src/main/kotlin")
}

tasks {
	val openApiValidate by getting
	val openApiGenerate by getting

	compileJava {
		dependsOn(openApiValidate)
		dependsOn(openApiGenerate)
	}

	compileKotlin {
		dependsOn(openApiValidate)
		dependsOn(openApiGenerate)
	}
}
