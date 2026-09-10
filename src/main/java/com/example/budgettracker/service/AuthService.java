package com.example.budgettracker.service;

import com.example.budgettracker.dto.AuthResponse;
import com.example.budgettracker.dto.LoginRequest;
import com.example.budgettracker.dto.RegisterRequest;
import com.example.budgettracker.entity.User;
import com.example.budgettracker.repository.UserRepository;
import com.example.budgettracker.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, "Email already registered", null, null, null);
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getId(), savedUser.getEmail());
        
        return new AuthResponse(token, "Registration successful", savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }
    
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            return new AuthResponse(null, "User not found", null, null, null);
        }
        
        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, "Invalid password", null, null, null);
        }
        
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, "Login successful", user.getId(), user.getName(), user.getEmail());
    }
}
