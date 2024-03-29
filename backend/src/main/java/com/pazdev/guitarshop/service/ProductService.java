package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dto.ProductDto;
import com.pazdev.guitarshop.entity.Product;

public interface ProductService {

    Product getProduct(Long id);
    void addProduct(ProductDto product);
    void updateProduct(Long id ,ProductDto product);
    void updateStock(Long id, int quantity);
}
