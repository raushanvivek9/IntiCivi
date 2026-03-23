package com.example.inticivi.repository;

import com.example.inticivi.model.Complaint;
import com.example.inticivi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUser(User user);
    List<Complaint> findByUserOrderByCreatedAtDesc(User user);
}