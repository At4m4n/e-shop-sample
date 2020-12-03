package com.itechartgroup.eshopsample.service.impl;

import com.itechartgroup.eshopsample.dto.ChargeResponse;
import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.dto.enums.Currency;
import com.itechartgroup.eshopsample.model.PaymentDetails;
import com.itechartgroup.eshopsample.repository.PaymentDetailsRepository;
import com.itechartgroup.eshopsample.service.ChargeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChargeServiceImpl implements ChargeService {

  private final PaymentDetailsRepository paymentDetailsRepository;

  @Value("${spring.stripe.secret}")
  private String secretKey;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }

  @Override
  public ChargeResponse charge(ChargeRequest request) throws StripeException {
    Charge charge = tryCharge(request);
    PaymentDetails payment = savePaymentDetails(request, charge);
    return new ChargeResponse(payment.getPaymentRef(), payment.getOrderId());
  }

  private Charge tryCharge(ChargeRequest request) throws StripeException {
    int centsAmount = (int) (request.getAmount() * 100);
    Map<String, Object> chargeParams = new HashMap<>();
    chargeParams.put("amount", centsAmount);
    chargeParams.put("currency", Currency.USD);
    chargeParams.put("source", request.getToken());
    return Charge.create(chargeParams);
  }

  private PaymentDetails savePaymentDetails(ChargeRequest request, Charge charge) {
    String orderId = Integer.toHexString(new Random().nextInt());

    PaymentDetails paymentDetails = new PaymentDetails();
    paymentDetails.setOrderId(orderId);
    paymentDetails.setPaymentRef(charge.getId());
    paymentDetails.setAddress(request.getAddress());
    paymentDetails.setCity(request.getCity());
    paymentDetails.setState(request.getState());
    paymentDetails.setZip(request.getZip());

    return paymentDetailsRepository.save(paymentDetails);
  }
}
