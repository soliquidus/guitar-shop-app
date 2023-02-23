package com.pazdev.guitarshop.controller;

import com.pazdev.guitarshop.dto.ProductDto;
import com.pazdev.guitarshop.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/new")
    public void addProduct(@RequestBody ProductDto productDto) {
        this.productService.addProduct(productDto);
    }

    @PutMapping("/update/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto updatedProduct) {
        updatedProduct.getProduct().setLastUpdated(new Date());
        return this.productService.updateProduct(id, updatedProduct);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id){
        this.productService.deleteProduct(id);
    }
}


