package com.example.webSocket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class HelloMessage {

    private String from;
    private String message;
    private LocalDateTime timeStamp;

}
