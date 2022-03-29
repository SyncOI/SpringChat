package ru.syncoi.springchat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ru.syncoi.springchat.model.ChatNotification;
import ru.syncoi.springchat.model.Message;
import ru.syncoi.springchat.service.MessageService;
import ru.syncoi.springchat.service.RoomService;

import java.util.Optional;

@Controller
public class ChatController {

    private SimpMessagingTemplate messagingTemplate;
    private MessageService messageService;
    private RoomService roomService;

    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService, RoomService roomService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
        this.roomService = roomService;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload Message chatMessage) {
        Optional<String> chatId =
                roomService.getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId.get());

        Message saved = messageService.save(chatMessage);

        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        saved.getId(),
                        saved.getSenderId(),
                        saved.getSenderName()
                )
        );
    }
}
