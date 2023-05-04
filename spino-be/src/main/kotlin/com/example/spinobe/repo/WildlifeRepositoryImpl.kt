package com.example.spinobe.repo

import com.example.spinobe.openapi.model.WildlifeInfo
import com.google.cloud.firestore.Firestore
import org.springframework.stereotype.Repository

@Repository
class WildlifeRepositoryImpl(
    private val db: Firestore
) : WildlifeRepository {

    val wildlireInfoCollectionRef = db.collection("WildlifeInfo")

    override fun findByDate(date: String?): WildlifeInfo {
        val future = wildlireInfoCollectionRef.whereEqualTo("createdAt", date).get()
        val data = future.get().documents[0].data
        return WildlifeInfo(
            name = data["name"] as String,
            habitat = data["habitat"] as String,
            description = data["description"] as String,
            tips = data["tips"] as String,
            createdAt = data["createdAt"] as String
        )
    }
}