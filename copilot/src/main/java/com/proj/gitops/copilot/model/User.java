package com.proj.gitops.copilot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String avatar;
    private boolean isGuest;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;

    public User() {
        this.createdAt = LocalDateTime.now();
        this.lastLoginAt = LocalDateTime.now();
    }
} 