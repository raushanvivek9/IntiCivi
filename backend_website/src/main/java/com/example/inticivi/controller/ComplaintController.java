package com.example.inticivi.controller;

import com.example.inticivi.model.Complaint;
import com.example.inticivi.model.User;
import com.example.inticivi.service.AuthService;
import com.example.inticivi.service.ComplaintService;
import com.example.inticivi.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@Valid @RequestBody Complaint complaint, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.replace("Bearer ", ""));
        Optional<User> user = authService.findByEmail(email);
        if (user.isPresent()) {
            complaint.setUser(user.get());
            complaint.setStatus("pending");
            Complaint saved = complaintService.createComplaint(complaint);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getComplaints(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.replace("Bearer ", ""));
        Optional<User> user = authService.findByEmail(email);
        if (user.isPresent()) {
            List<Complaint> complaints = complaintService.getComplaintsByUser(user.get());
            return ResponseEntity.ok(complaints);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaint(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.replace("Bearer ", ""));
        Optional<User> user = authService.findByEmail(email);
        if (user.isPresent()) {
            Optional<Complaint> complaint = complaintService.getComplaintById(id);
            if (complaint.isPresent() && complaint.get().getUser().equals(user.get())) {
                return ResponseEntity.ok(complaint.get());
            }
        }
        return ResponseEntity.notFound().build();
    }

    // Admin endpoint to get all complaints
    @GetMapping("/admin/all")
    public ResponseEntity<List<Complaint>> getAllComplaints(@RequestHeader("Authorization") String token) {
        String role = jwtService.extractRole(token.replace("Bearer ", ""));
        if ("admin".equals(role)) {
            List<Complaint> complaints = complaintService.getAllComplaints();
            return ResponseEntity.ok(complaints);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.emptyList());
    }

    // Admin update status
    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestParam String status, @RequestHeader("Authorization") String token) {
        String role = jwtService.extractRole(token.replace("Bearer ", ""));
        if ("admin".equals(role)) {
            Optional<Complaint> complaintOpt = complaintService.getComplaintById(id);
            if (complaintOpt.isPresent()) {
                Complaint complaint = complaintOpt.get();
                complaint.setStatus(status);
                Complaint updated = complaintService.updateComplaint(complaint);
                return ResponseEntity.ok(updated);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}