package com.example.spinobe.service

import com.example.spinobe.openapi.model.WildlifeInfo
import com.example.spinobe.repository.WildlifeRepository
import io.mockk.MockKAnnotations
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.assertj.core.api.Assertions.assertThat

class WildlifeServiceImplTest {
    @MockK
    private lateinit var wildlifeRepository: WildlifeRepository

    @InjectMockKs
    private lateinit var target: WildlifeServiceImpl

    @BeforeEach
    fun setUp() = MockKAnnotations.init(this)

    @Nested
    inner class TestGetWildlife {
        @Test
        fun `正常系 有効なパラメータが渡された時、WildlifeInfoが返る`(){
            // setup
            val date = "2023-05-17"
            val expected = WildlifeInfo(
                name = "test name",
                habitat = "test habitat",
                description = "test description",
                createdAt = "test cratedAt",
                trivia = "test trivia"
            )
            every { wildlifeRepository.findByDate(any()) } returns expected

            // when
            val result = target.getWildlife(date)

            // then
            assertThat(result).isEqualTo(expected)
            verify(exactly = 1) { wildlifeRepository.findByDate(date) }
            confirmVerified(wildlifeRepository)
        }
    }
}
