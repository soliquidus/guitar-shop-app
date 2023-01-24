package com.pazdev.guitarshop.controller;

import com.pazdev.guitarshop.dto.ProductDto;
import com.pazdev.guitarshop.entity.Product;
import com.pazdev.guitarshop.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping("/api/products/")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable Long id) {
        return this.productService.getProduct(id);
    }

    @PostMapping
    public void addProduct(@RequestBody ProductDto productDto) {
        this.productService.addProduct(productDto);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto updatedProduct) {
        updatedProduct.getProduct().setLastUpdated(new Date());
        return this.productService.updateProduct(id, updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        this.productService.deleteProduct(id);
    }
}
