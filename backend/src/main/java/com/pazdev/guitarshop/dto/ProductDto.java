package com.pazdev.guitarshop.dto;

import com.pazdev.guitarshop.entity.Product;
import com.pazdev.guitarshop.entity.ProductCategory;
import lombok.Data;

@Data
public class ProductDto {
    private ProductCategory productCategory;
    private Product product;
}
