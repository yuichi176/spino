package com.example.spinobe.service

import com.example.spinobe.openapi.api.WildlifeApiService
import com.example.spinobe.openapi.model.WildlifeInfo
import com.example.spinobe.repo.WildlifeRepository
import org.springframework.stereotype.Service

@Service
class WildlifeServiceImpl(
    private val wildlifeRepository: WildlifeRepository
) : WildlifeApiService {

    override fun getWildlife(date: String): WildlifeInfo =
        wildlifeRepository.findByDate(date)
}
