package com.proj.gitops.copilot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    // In-memory chat storage for demo (replace with DB in production)
    private final List<Map<String, Object>> chats = new ArrayList<>();

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createChat(@RequestBody Map<String, Object> chatRequest) {
        // Example: expects { "title": "Chat Title" }
        Map<String, Object> chat = new HashMap<>();
        chat.put("id", UUID.randomUUID().toString());
        chat.put("title", chatRequest.getOrDefault("title", "Untitled Chat"));
        chat.put("createdAt", new Date());
        chats.add(chat);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("")
    public ResponseEntity<List<Map<String, Object>>> getAllChats() {
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getChatById(@PathVariable String id) {
        return chats.stream()
                .filter(chat -> id.equals(chat.get("id")))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable String id) {
        boolean removed = chats.removeIf(chat -> id.equals(chat.get("id")));
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // TODO: Add endpoints for GitOps features (PR creation, YAML modification, etc.)
    // @PostMapping("/git/pr")
    // public ResponseEntity<?> createPullRequest(...) { ... }

    // @PostMapping("/git/yaml")
    // public ResponseEntity<?> modifyYaml(...) { ... }

    // @GetMapping("/git/monitor")
    // public ResponseEntity<?> monitorGitRepo(...) { ... }

    // @PostMapping("/git/ci-cd")
    // public ResponseEntity<?> triggerCICD(...) { ... }

    // Authentication and security to be added in future milestones
} 