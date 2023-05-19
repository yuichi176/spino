package com.example.spinobe.controller

import com.example.spinobe.domain.CustomError
import com.example.spinobe.exception.NotFoundException
import org.apache.commons.logging.LogFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ExceptionHandler {
    companion object {
        private val log = LogFactory.getLog(ResponseEntityExceptionHandler::class.java)
    }

    @ExceptionHandler(NotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleNotFoundException(ex: NotFoundException): CustomError {
        log.error(ex.message, ex)
        return CustomError(
            status = HttpStatus.NOT_FOUND.value(),
            message = ex.message
        )
    }
}
