package com.itechartgroup.eshopsample.repository;

import com.itechartgroup.eshopsample.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

}
