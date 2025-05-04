package com.proj.gitops.copilot.controller;

import com.proj.gitops.copilot.llm.LlmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AskController {

    @Autowired
    private LlmService llmService;

    @PostMapping("/ask")
    public String askLlm(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        return llmService.ask(prompt);
    }
}
