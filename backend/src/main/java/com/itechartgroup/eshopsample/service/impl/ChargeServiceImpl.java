package com.itechartgroup.eshopsample.service.impl;

import com.itechartgroup.eshopsample.dto.ChargeResponse;
import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.dto.enums.Currency;
import com.itechartgroup.eshopsample.service.ChargeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ChargeServiceImpl implements ChargeService {

  @Value("${spring.stripe.secret}")
  private String secretKey;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }

  @Override
  public ChargeResponse charge(ChargeRequest request) throws StripeException {
    int centsAmount = (int) (request.getAmount() * 100);
    Map<String, Object> chargeParams = new HashMap<>();
    chargeParams.put("amount", centsAmount);
    chargeParams.put("currency", Currency.USD);
    chargeParams.put("source", request.getToken());
    Charge charge = Charge.create(chargeParams);

    String orderId = Integer.toHexString(new Random().nextInt());

    return new ChargeResponse(charge.getId(), orderId);
  }
}
