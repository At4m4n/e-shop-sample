package com.itechartgroup.eshopsample.controller;

import com.itechartgroup.eshopsample.dto.ErrorResponse;
import com.stripe.exception.StripeException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor {

  @ExceptionHandler(StripeException.class)
  public ResponseEntity<ErrorResponse> handleError(Exception ex) {
    ErrorResponse error = new ErrorResponse(ex.getMessage(),
        LocalDateTime.now(), HttpStatus.BAD_REQUEST.value());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }
}
