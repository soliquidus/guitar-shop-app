package com.pazdev.guitarshop.dao;

import com.pazdev.guitarshop.entity.Product;
import com.pazdev.guitarshop.exception.ResourceNotFound;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable) throws ResourceNotFound;

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

    @Query(value = "SELECT * FROM product p WHERE p.category_id =:id ORDER BY p.date_created DESC LIMIT 3",
            nativeQuery = true)
    List<Product> getLastAddedByCategory(@Param("id") Long id) throws ResourceNotFound;

}