package com.example.spinobe.repo

import com.example.spinobe.openapi.model.WildlifeInfo

interface WildlifeRepository {
    fun findByDate(date: String?): WildlifeInfo
}