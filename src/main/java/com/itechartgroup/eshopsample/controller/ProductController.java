package com.itechartgroup.eshopsample.controller;

import static com.itechartgroup.eshopsample.controller.ApiConstants.PRODUCT;

import com.itechartgroup.eshopsample.model.Product;
import com.itechartgroup.eshopsample.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(PRODUCT)
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

  @GetMapping
  public List<Product> getAllProducts(){
    return productService.getAll();
  }
}
