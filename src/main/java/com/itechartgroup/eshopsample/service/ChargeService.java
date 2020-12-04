package com.itechartgroup.eshopsample.service;

import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.model.PaymentDetails;
import com.stripe.exception.StripeException;

public interface ChargeService {

  PaymentDetails charge(ChargeRequest request) throws StripeException;
}
