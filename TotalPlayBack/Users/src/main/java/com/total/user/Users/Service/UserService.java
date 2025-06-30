package com.total.user.Users.Service;

import com.total.user.Users.Model.User;
import com.total.user.Users.Repository.UserRepository;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public void register(String username, String rawPassword) throws AuthenticationException {
        if (repo.findByUsername(username).isPresent()) {
            throw new AuthenticationException("User already exists");
        }
        String hash = encoder.encode(rawPassword);
        User u = new User();
        u.setUsername(username);
        u.setPassword(hash);
        repo.save(u);
    }

    public boolean authenticate(String username, String rawPassword) {
        Optional<User> ou = repo.findByUsername(username);
        if (ou.isEmpty()) return false;
        return encoder.matches(rawPassword, ou.get().getPassword());
    }
}