package ru.syncoi.springchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.syncoi.springchat.service.MessageService;

@RestController
@RequestMapping("/api/message")
@CrossOrigin
public class MessageController {

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<?> getMessagesByChatId(@PathVariable String chatId) {
        return ResponseEntity.ok().body(messageService.findByChatId(chatId));
    }
}
