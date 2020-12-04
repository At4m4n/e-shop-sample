package com.itechartgroup.eshopsample.service.impl;

import com.itechartgroup.eshopsample.dto.ChargeRequest;
import com.itechartgroup.eshopsample.dto.enums.Currency;
import com.itechartgroup.eshopsample.exception.PaymentException;
import com.itechartgroup.eshopsample.model.PaymentDetails;
import com.itechartgroup.eshopsample.repository.PaymentDetailsRepository;
import com.itechartgroup.eshopsample.service.ChargeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class StripeChargeServiceImpl implements ChargeService {

  //Since we use dollars as main currency
  private static final int CENTS_IN_DOLLAR = 100;

  private final PaymentDetailsRepository paymentDetailsRepository;

  @Value("${spring.stripe.secret}")
  private String secretKey;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }

  @Override
  public PaymentDetails charge(ChargeRequest request) {
    String orderId = generateOrderId();
    log.info("Received a new charge request with amount {}. It is assigned with orderId {}.",
        request.getAmount(), orderId);
    Charge charge;
    try {
      charge = tryCharge(request);
      log.info("Charge request with orderId {} successfully processed, saving the details.", orderId);
    } catch (StripeException e) {
      log.error("Charge request with orderId {} failed with message \"{}\".", orderId, e.getMessage());
      throw new PaymentException(e.getMessage());
    }
    PaymentDetails payment = savePaymentDetails(orderId, request, charge);
    log.debug("Payment details for request with orderId {} saved successfully.", orderId);
    return payment;
  }

  private Charge tryCharge(ChargeRequest request) throws StripeException {
    int centsAmount = convertToCents(request.getAmount());
    Map<String, Object> chargeParams = new HashMap<>();
    chargeParams.put("amount", centsAmount);
    chargeParams.put("currency", Currency.USD);
    chargeParams.put("source", request.getToken());
    return Charge.create(chargeParams);
  }

  private PaymentDetails savePaymentDetails(String orderId, ChargeRequest request, Charge charge) {
    PaymentDetails paymentDetails = new PaymentDetails();
    paymentDetails.setOrderId(orderId);
    paymentDetails.setPaymentRef(charge.getId());
    paymentDetails.setAddress(request.getAddress());
    paymentDetails.setCity(request.getCity());
    paymentDetails.setState(request.getState());
    paymentDetails.setZip(request.getZip());
    return paymentDetailsRepository.save(paymentDetails);
  }

  private int convertToCents(BigDecimal amount) {
    BigDecimal centsAmount = amount.multiply(BigDecimal.valueOf(CENTS_IN_DOLLAR));
    return centsAmount.setScale(0, RoundingMode.HALF_UP).intValueExact();
  }

  private String generateOrderId() {
    return Integer.toHexString(new Random().nextInt());
  }
}
