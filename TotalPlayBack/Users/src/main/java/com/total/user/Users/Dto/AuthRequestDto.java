package com.total.user.Users.Dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequestDto(@NotBlank(message = "El nombre de usuario no puede estar vacío")
                             String username,
                             @NotBlank(message = "La contraseña no puede estar vacía")
                             String password)
{
}
