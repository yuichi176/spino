package com.example.spinobe.service

import com.example.spinobe.openapi.api.WildlifeApiService
import com.example.spinobe.openapi.model.WildlifeInfo
import org.springframework.stereotype.Service

@Service
class WildlifeServiceImpl : WildlifeApiService {

    override fun getWildlife(day: String?): WildlifeInfo {
        TODO("Not yet implemented")
    }
}
