package com.pazdev.guitarshop.controller;

import com.pazdev.guitarshop.dto.Purchase;
import com.pazdev.guitarshop.dto.PurchaseResponse;
import com.pazdev.guitarshop.service.CheckoutService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/checkout")
public class CheckoutController {
 private final CheckoutService checkoutService;


    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return this.checkoutService.placeOrder(purchase);
    }
}
