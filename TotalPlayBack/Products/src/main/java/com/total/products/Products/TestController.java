package com.total.products.Products;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestController {
    @GetMapping
    public String index() {
        return "Owo";
    }
    @GetMapping("awa")
    public String index2() {
        return "Owo";
    }
}
