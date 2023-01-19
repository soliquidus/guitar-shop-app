package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dao.ProductCategoryRepository;
import com.pazdev.guitarshop.entity.ProductCategory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService{

    private final ProductCategoryRepository productCategoryRepository;

    @Override
    @Transactional
    public ProductCategory addCategory(ProductCategory productCategory) {
        return this.productCategoryRepository.save(productCategory);
    }
}
