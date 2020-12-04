package com.itechartgroup.eshopsample.model;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product", schema = "e_shop")
public class Product {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "varchar(100)")
  private String title;

  @Column(columnDefinition="Decimal(15,2)")
  private BigDecimal price;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_path")
  private String imagePath;
}
