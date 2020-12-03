package com.itechartgroup.eshopsample.controller;

import static com.itechartgroup.eshopsample.controller.ApiConstants.CHARGE;

import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.model.PaymentDetails;
import com.itechartgroup.eshopsample.service.ChargeService;
import com.stripe.exception.StripeException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(CHARGE)
@RequiredArgsConstructor
public class ChargeController {

  private final ChargeService service;

  @PostMapping
  public PaymentDetails charge(@RequestBody @Valid ChargeRequest request) throws StripeException {
    return service.charge(request);
  }
}

