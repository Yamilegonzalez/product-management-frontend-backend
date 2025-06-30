package com.total.user.Users.Controller;

import com.total.user.Users.Dto.AuthRequestDto;
import com.total.user.Users.Dto.AuthResponseDto;
import com.total.user.Users.Repository.UserRepository;
import com.total.user.Users.Service.JwtService;
import com.total.user.Users.Service.UserService;
import jakarta.validation.Valid;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public UserController(UserService userService, JwtService jwtService, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthResponseDto> authenticateUser(@Valid @RequestBody AuthRequestDto authRequest) {
        if (userService.authenticate(authRequest.username(), authRequest.password())) {
            String token = jwtService.generateToken(authRequest.username());
            return ResponseEntity.ok(new AuthResponseDto(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequestDto req) throws AuthenticationException {
        if(userRepository.findByUsername(req.username()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Ya existe un usuario con el nombre: " + req.username()));
        }
        userService.register(req.username(), req.password());
        String token = jwtService.generateToken(req.username());
        return ResponseEntity.ok(new AuthResponseDto(token));
    }

    @GetMapping("/")
    public Map<String, String> getProducts() {
        return Map.of("message", "Hola Mundo desde UserController Service");
    }
}