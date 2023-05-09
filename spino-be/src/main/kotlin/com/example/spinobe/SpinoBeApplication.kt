package com.example.spinobe

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class SpinoBeApplication

fun main(args: Array<String>) {
	runApplication<SpinoBeApplication>(*args)
}
