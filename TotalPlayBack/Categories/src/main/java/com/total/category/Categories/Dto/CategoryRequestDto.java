package com.total.category.Categories.Dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDto(@NotBlank(message = "El nombre de la categoría no puede estar vacío")
                                 String name) {

}