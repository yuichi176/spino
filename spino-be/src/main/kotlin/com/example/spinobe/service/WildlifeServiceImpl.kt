package com.example.spinobe.service

import com.example.spinobe.openapi.api.WildlifeApiService
import com.example.spinobe.openapi.model.WildlifeInfo
import org.springframework.stereotype.Service

@Service
class WildlifeServiceImpl : WildlifeApiService {

    override fun getWildlife(date: String?): WildlifeInfo {
        val wildlifeInfo: WildlifeInfo = WildlifeInfo(
            name = "モモイロペリカン",
            habitat = "主に熱帯・亜熱帯の沿岸・内水域",
            description = "モモイロペリカンは、世界で唯一のピンク色のペリカンで、主に熱帯・亜熱帯の沿岸・内水域に生息しています。大型の鳥で、全長は1.6mほどにもなり、翼幅は2.5-3mに達することがあります。また、上嘴は下嘴よりも長く、喉袋が大きいことが特徴です。モモイロペリカンは主に魚を食べ、高いところから急降下して魚を捕まえることができます。",
            tips = "モモイロペリカンは、魚を捕る際に高いところから急降下するため、繁殖地周辺に高い建物や木があると、誤って衝突してしまうことがあります。そのため、繁殖地周辺にはそうした障害物がないようにすることが大切です。",
            createdAt = "2023-05-04",
        )
        return wildlifeInfo
    }
}
