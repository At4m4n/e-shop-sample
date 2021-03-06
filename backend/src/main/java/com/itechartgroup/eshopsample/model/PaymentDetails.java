package com.itechartgroup.eshopsample.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "payment_details", schema = "e_shop")
public class PaymentDetails {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "varchar(100)", name = "payment_ref")
  private String paymentRef;

  @Column(columnDefinition = "varchar(30)")
  private String orderId;

  @Column(columnDefinition = "varchar(255)")
  @JsonIgnore
  private String address;

  @Column(columnDefinition = "varchar(30)")
  @JsonIgnore
  private String city;

  @Column(columnDefinition = "varchar(30)")
  @JsonIgnore
  private String state;

  @Column(columnDefinition = "MEDIUMINT")
  @JsonIgnore
  private Integer zip;
}
