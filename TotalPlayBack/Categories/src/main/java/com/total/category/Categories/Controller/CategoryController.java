package com.total.category.Categories.Controller;

import com.total.category.Categories.Dto.CategoryRequestDto;
import com.total.category.Categories.Model.Category;
import com.total.category.Categories.Repository.CategoryRepository;
import com.total.category.Categories.Util.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequestDto request) {
        boolean exists = categoryRepository.existsByNameIgnoreCase(request.name());
        if (exists) {
            return ResponseUtil.error("Ya existe una categoría con el nombre: " + request.name(), HttpStatus.CONFLICT);
        }
        Category category = new Category();
        category.setName(request.name());
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequestDto request) {
        boolean exists = categoryRepository.existsByNameIgnoreCase(request.name());
        if (exists) {
            return ResponseUtil.error("Ya existe una categoría con el nombre: " + request.name(), HttpStatus.CONFLICT);
        }
        return categoryRepository.findById(id)
                .map(existing -> {
                    existing.setName(request.name());
                    return ResponseEntity.ok(categoryRepository.save(existing));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(existing -> {
                    categoryRepository.delete(existing);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/awa")
    public Map<String, String> getCategories() {
        return Map.of("message", "Hola Mundo desde Categories Service");
    }
}
