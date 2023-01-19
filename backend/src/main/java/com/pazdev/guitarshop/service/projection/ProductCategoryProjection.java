package com.pazdev.guitarshop.service.projection;

import com.pazdev.guitarshop.entity.Product;
import com.pazdev.guitarshop.entity.ProductCategory;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "withProducts", types = ProductCategory.class)
public interface ProductCategoryProjection {
    Long getId();
    String getCategoryName();
    List<Product> getProducts();
}
