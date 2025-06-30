package com.total.products.Products.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequestDto(@NotBlank(message = "El nombre del producto no puede) estar vacío")
                                String name,
                                @NotBlank(message = "La descripción del producto no puede estar vacía")
                                String description,
                                @NotNull(message = "El precio del producto no puede estar vacío")
                                Double price,
                                String imageUrl,
                                @NotNull(message = "El ID de la categoría no puede estar vacío")
                                Long categoryId) {
}
