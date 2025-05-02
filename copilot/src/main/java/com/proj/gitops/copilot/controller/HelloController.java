package com.proj.gitops.copilot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello From GitOps Copilot!!";
    }
    
}
