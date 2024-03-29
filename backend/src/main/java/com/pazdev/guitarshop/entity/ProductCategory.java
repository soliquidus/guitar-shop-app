package com.pazdev.guitarshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products = new HashSet<>();

    public void addProduct(Product product) {
        if (product != null) {
            if (products == null) {
                products = new HashSet<>();
            }
            if (products.contains(product)) {
                for (Product p : products) {
                    if (p.getId().equals(product.getId())) {
                        p = product;
                        p.setCategory(this);
                    }
                }
            } else {
                products.add(product);
                product.setCategory(this);
            }
        }
    }
}
