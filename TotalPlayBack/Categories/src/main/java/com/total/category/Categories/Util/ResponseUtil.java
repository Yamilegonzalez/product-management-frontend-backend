package com.total.category.Categories.Util;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;
public class ResponseUtil {
    public static ResponseEntity<Map<String, Object>> error(String message, HttpStatus status) {
        Map<String, Object> body = new LinkedHashMap<>();

        body.put("status", status.value());
        body.put("message", message);

        return ResponseEntity.status(status).body(body);
    }
    public static ResponseEntity<Map<String, Object>> success(String message) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);

        return ResponseEntity.ok(body);
    }
}
