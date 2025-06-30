package com.total.user.Users.Config;

import com.total.user.Users.Model.User;
import com.total.user.Users.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner loadInitialUsers(UserRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Create and save initial users
                User user1 = new User();
                user1.setUsername("yamiletest");
                user1.setPassword(passwordEncoder.encode("yamiletest"));
                repository.save(user1);
            }
        };
    }
}
