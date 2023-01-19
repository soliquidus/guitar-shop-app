package com.pazdev.guitarshop.controller;

import com.pazdev.guitarshop.entity.ProductCategory;
import com.pazdev.guitarshop.service.ProductCategoryService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/product-category/")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }


    @PostMapping
    public ProductCategory createCategory(@RequestBody ProductCategory productCategory) {
        return this.productCategoryService.addCategory(productCategory);
    }
}
