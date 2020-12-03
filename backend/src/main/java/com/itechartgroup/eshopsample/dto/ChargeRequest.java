package com.itechartgroup.eshopsample.dto;

import java.math.BigDecimal;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import lombok.Data;

@Data
public class ChargeRequest {

  private String token;

  @DecimalMin(value = "0.01", message = "Amount must be greater than or equal to 0.01")
  @Digits(integer = 15, fraction = 2, message = "Only two fraction digits allowed for amount value.")
  private BigDecimal amount;

  private String address;

  private String city;

  private String state;

  private Integer zip;
}
