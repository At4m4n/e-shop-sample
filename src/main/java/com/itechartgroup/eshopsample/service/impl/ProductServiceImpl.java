package com.itechartgroup.eshopsample.service.impl;

import com.itechartgroup.eshopsample.repository.ProductRepository;
import com.itechartgroup.eshopsample.model.Product;
import com.itechartgroup.eshopsample.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

  private final ProductRepository repository;

  @Override
  public List<Product> getAll() {
    return repository.findAll();
  }
}
