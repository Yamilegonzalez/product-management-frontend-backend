package com.total.category.Categories.Config;

import com.total.category.Categories.Model.Category;
import com.total.category.Categories.Repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {
    @Bean
    public CommandLineRunner loadInitialCategories(CategoryRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Category cat1 = new Category();
                cat1.setName("Electrónica de consumo");

                Category cat2 = new Category();
                cat2.setName("Equipos de audio");

                Category cat3 = new Category();
                cat3.setName("Equipos de seguridad:");

                Category cat4 = new Category();
                cat4.setName("Accesorios");

                Category cat5 = new Category();
                cat5.setName("Componentes electrónicos:");

                repository.saveAll(List.of(cat1, cat2, cat3, cat4, cat5));
                System.out.println("Categorías iniciales creadas.");
            }
        };
    }
}
