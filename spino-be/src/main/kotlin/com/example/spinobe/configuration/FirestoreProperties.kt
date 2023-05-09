package com.example.spinobe.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "firestore")
class FirestoreProperties(
    val collectionName: String
)
