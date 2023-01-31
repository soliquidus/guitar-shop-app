package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dto.ProductDto;

public interface ProductService {

    void addProduct(ProductDto product);
    ProductDto updateProduct(Long id , ProductDto product);
    void updateStock(Long id, int quantity);
    void deleteProduct(Long id);
}
