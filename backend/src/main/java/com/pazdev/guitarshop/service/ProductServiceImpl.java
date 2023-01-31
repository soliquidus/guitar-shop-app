package com.pazdev.guitarshop.service;

import com.pazdev.guitarshop.dao.ProductRepository;
import com.pazdev.guitarshop.dto.ProductDto;
import com.pazdev.guitarshop.entity.ProductCategory;
import com.pazdev.guitarshop.exception.ResourceNotFound;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void addProduct(ProductDto productDto) {
        ProductCategory productCategory = productDto.getProductCategory();
        productCategory.addProduct(productDto.getProduct());
        try {
            this.productRepository.save(productDto.getProduct());
        } catch (NullPointerException e) {
            throw new NullPointerException();
        }
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        this.productRepository.findById(id).map(product -> {
            product.setCategory(productDto.getProduct().getCategory());
            product.setBrand(productDto.getProduct().getBrand());
            product.setActive(productDto.getProduct().isActive());
            product.setDescription(productDto.getProduct().getDescription());
            product.setSku(productDto.getProduct().getSku());
            product.setName(productDto.getProduct().getName());
            product.setUnitPrice(productDto.getProduct().getUnitPrice());
            product.setUnitsInStock(productDto.getProduct().getUnitsInStock());
            product.setDateCreated(productDto.getProduct().getDateCreated());
            product.setImageUrl(productDto.getProduct().getImageUrl());
            product.setLastUpdated(productDto.getProduct().getLastUpdated());
            return this.productRepository.save(product);
        }).orElseThrow(() -> new ResourceNotFound(String.format("User with id %s not found", id)));
        return productDto;
    }

    @Override
    public void updateStock(Long id, int quantity) {
        this.productRepository.findById(id).map(product -> {
            int stock = product.getUnitsInStock() - quantity;
            product.setUnitsInStock(stock);
            return this.productRepository.save(product);
        }).orElseThrow(() -> new NullPointerException(String.format("Error while updating stock quantity %d for product id %d", id, quantity)) {
        });
    }

    @Override
    public void deleteProduct(Long id) {
        try {
            this.productRepository.deleteById(id);
        } catch (ResourceNotFound e) {
            throw new ResourceNotFound(String.format("Product with id %s not found", id));
        }
    }
//
//    @Override
//    public List<Product> getByDate(Long id) {
//        return this.productRepository.getAllByCategoryAndOrderByDateCreated(id);
//    }
}
