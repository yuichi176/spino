package com.example.spinobe.repository

import com.example.spinobe.openapi.model.WildlifeInfo

interface WildlifeRepository {
    fun findByDate(date: String): WildlifeInfo
}