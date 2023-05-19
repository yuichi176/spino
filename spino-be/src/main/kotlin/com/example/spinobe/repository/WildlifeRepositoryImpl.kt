package com.example.spinobe.repository

import com.example.spinobe.configuration.FirestoreProperties
import com.example.spinobe.exception.NotFoundException
import com.example.spinobe.openapi.model.WildlifeInfo
import com.google.cloud.firestore.Firestore
import org.springframework.stereotype.Repository

@Repository
class WildlifeRepositoryImpl(
    private val db: Firestore,
    private val firestoreProperties: FirestoreProperties
) : WildlifeRepository {

    val wildlireInfoCollectionRef = db.collection(firestoreProperties.collectionName)

    override fun findByDate(date: String): WildlifeInfo {
        val future = wildlireInfoCollectionRef.whereEqualTo("createdAt", date).get()
        if (future.get().isEmpty) throw NotFoundException("WildLife not found")
        val data = future.get().documents[0].data
        return WildlifeInfo(
            name = data["name"] as String,
            habitat = data["habitat"] as String,
            description = data["description"] as String,
            trivia = data["trivia"] as String,
            createdAt = data["createdAt"] as String
        )
    }
}