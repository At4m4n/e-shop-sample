package com.itechartgroup.eshopsample.service;

import com.itechartgroup.eshopsample.dto.ChargeResponse;
import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.stripe.exception.StripeException;

public interface ChargeService {

  ChargeResponse charge(ChargeRequest request) throws StripeException;
}
