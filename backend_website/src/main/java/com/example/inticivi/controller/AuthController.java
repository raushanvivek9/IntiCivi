package com.example.inticivi.controller;

import com.example.inticivi.dto.AuthResponse;
import com.example.inticivi.dto.LoginRequest;
import com.example.inticivi.model.User;
import com.example.inticivi.service.AuthService;
import com.example.inticivi.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Assuming frontend runs on 5173
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        User savedUser = authService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        Optional<User> user = authService.findByEmail(loginRequest.getEmail());
        AuthResponse response = new AuthResponse(token, user.get());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.replace("Bearer ", ""));
        Optional<User> user = authService.findByEmail(email);
        return user.map(u -> ResponseEntity.ok(u)).orElse(ResponseEntity.notFound().build());
    }
}