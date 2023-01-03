package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dto.Purchase;
import com.pazdev.guitarshop.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
