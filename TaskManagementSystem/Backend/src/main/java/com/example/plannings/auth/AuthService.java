
package com.example.plannings.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // You would typically hash the password here
        return userRepository.save(user);
    }

    public boolean loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .map(user -> user.getPassword().equals(password)) // In a real app, use password encoder
                .orElse(false);
    }
}