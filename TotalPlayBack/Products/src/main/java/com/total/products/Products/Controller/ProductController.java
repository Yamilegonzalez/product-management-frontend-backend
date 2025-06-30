package com.total.products.Products.Controller;

import com.total.products.Products.Dto.ProductRequestDto;
import com.total.products.Products.Model.Product;
import com.total.products.Products.Repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequestDto request) {
        log.info("Request to create product: {}", request);
        Product product = new Product();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        if(request.imageUrl() != null && !request.imageUrl().isBlank())
            product.setImageUrl(request.imageUrl());
        product.setCategoryId(request.categoryId());
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.status(201).body(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDto request) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(request.name());
                    existing.setPrice(request.price());
                    existing.setDescription(request.description());
                    existing.setCategoryId(request.categoryId());
                    if(request.imageUrl() != null && !request.imageUrl().isBlank())
                        existing.setImageUrl(request.imageUrl());
                    Product updatedProduct = productRepository.save(existing);
                    return ResponseEntity.ok(updatedProduct);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(existing -> {
                    productRepository.delete(existing);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/live")
    public String getProducts() {
        return "Hola Mundo desde Product Service";
    }
}