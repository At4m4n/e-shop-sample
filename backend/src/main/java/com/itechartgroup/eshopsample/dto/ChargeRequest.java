package com.itechartgroup.eshopsample.dto;

import lombok.Data;

@Data
public class ChargeRequest {

  private String token;

  private Double amount;

  private String address;

  private String city;

  private String state;

  private Integer zip;
}
