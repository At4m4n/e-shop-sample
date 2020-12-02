package com.itechartgroup.eshopsample.controller;

import static com.itechartgroup.eshopsample.controller.ApiConstants.CHARGE;

import com.itechartgroup.eshopsample.dto.ChargeResponse;
import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.service.ChargeService;
import com.stripe.exception.StripeException;
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
  public ChargeResponse charge(@RequestBody ChargeRequest request) throws StripeException {
    return service.charge(request);
  }
}

