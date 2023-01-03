package com.pazdev.guitarshop.dto;

import com.pazdev.guitarshop.entity.Address;
import com.pazdev.guitarshop.entity.Customer;
import com.pazdev.guitarshop.entity.Order;
import com.pazdev.guitarshop.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
