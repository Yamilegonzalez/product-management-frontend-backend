//package com.total.api_gateway.Gateway.Config;
//
//import com.total.api_gateway.Gateway.Component.JwtAuthenticationFilter;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class GatewayConfig {
//
//    @Bean
//    public RouteLocator routes(RouteLocatorBuilder builder, JwtAuthenticationFilter jwtFilter) {
//        return builder.routes()
//                .route("product-service", r -> r.path("/api/products/**")
//                        .filters(f -> f
//                                .filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
//                                .rewritePath("/api/products/(?<segment>.*)", "/products/${segment}")
//                        )
//                        .uri("http://product-service:8081"))
//                .route("category-service", r -> r.path("/api/categories/**")
//                        .filters(f -> f
//                                .filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
//                                .rewritePath("/api/categories/(?<segment>.*)", "/categories/${segment}")
//                        )
//                        .uri("http://category-service:8082"))
//                .route("user-service", r -> r.path("/api/users/**")
//                        .filters(f -> f.rewritePath("/api/users/(?<segment>.*)", "/users/${segment}"))
//                        .uri("http://user-service:8083"))
//                .build();
//    }
//}