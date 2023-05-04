package com.example.spinobe

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.cloud.firestore.FirestoreOptions
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.io.IOException

@Configuration
class FireStoreConfig {
    @Bean
    @Throws(IOException::class)
    fun getFireStore(): Firestore? {
        val credentials = GoogleCredentials.getApplicationDefault()
        val options = FirestoreOptions.newBuilder()
            .setCredentials(credentials).build()
        return options.service
    }
}
