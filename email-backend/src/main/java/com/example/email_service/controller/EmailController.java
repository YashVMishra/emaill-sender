package com.example.email_service.controller;

import com.example.email_service.controller.EmailController.EmailRequest;
import com.example.email_service.model.EmailEntity;
import com.example.email_service.service.EmailService;

import lombok.Data;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/emails")
@CrossOrigin(origins = "*") // allow frontend if needed
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // ✅ Health check
    @GetMapping("/health")
    public String healthCheck() {
        return emailService.healthCheck();
    }

    // ✅ Get email history
    @GetMapping
    public List<EmailEntity> getAllEmails() {
        return emailService.getAllEmails();
    }

    // ✅ Send email
    @PostMapping
    public String sendEmail(@RequestBody EmailRequest email) {
        return emailService.sendEmail(
            email.getFromAddress(),
            email.getToAddress(), 
            email.getSubject(), 
            email.getBody(), 
            email.getAttachmentName()
                
        );
    }

    @Data
    public static class EmailRequest {
        public String fromAddress;
        public List<String> toAddress;
        public String subject;
        public String body;
        public String attachmentName;
    }
}
