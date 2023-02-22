package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dao.CustomerRepository;
import com.pazdev.guitarshop.dto.Purchase;
import com.pazdev.guitarshop.dto.PurchaseResponse;
import com.pazdev.guitarshop.entity.Customer;
import com.pazdev.guitarshop.entity.Order;
import com.pazdev.guitarshop.entity.OrderItem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

/**
 * The type Checkout service.
 */
@Service
@AllArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {
    private final CustomerRepository customerRepository;
    private final ProductService productService;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve order from DTO
        Order order = purchase.getOrder();

        // tracking number generation
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // fill order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);

        // fill order with addresses
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // fill customer with order and check if exists in DB based on email
        Customer customer = purchase.getCustomer();
        String email = customer.getEmail();
        Customer customerInDb = customerRepository.findByEmail(email);

        if(customerInDb != null) {
            customer = customerInDb;
        }

        customer.add(order);

        // save to database
        try {
            customerRepository.save(customer);

            // update products stock
            orderItems.forEach(item ->
                    this.productService.updateStock(item.getProductId(), item.getQuantity())
            );
        } catch (Exception e) {
            throw new NullPointerException();
        }

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
