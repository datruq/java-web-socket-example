package com.example.webSocket.controller;

import com.example.webSocket.dto.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class MessageController {

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public HelloMessage send(HelloMessage message) {
        LocalDateTime timestamp = LocalDateTime.now();
        return new HelloMessage(message.getFrom(), message.getMessage(), timestamp);
    }
}
