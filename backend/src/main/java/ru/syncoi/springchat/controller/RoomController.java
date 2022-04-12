package ru.syncoi.springchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.syncoi.springchat.dto.UserInfo;
import ru.syncoi.springchat.model.User;
import ru.syncoi.springchat.service.MessageService;
import ru.syncoi.springchat.service.RoomService;
import ru.syncoi.springchat.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/room")
@CrossOrigin
public class RoomController {

    private RoomService roomService;
    private UserService userService;
    private MessageService messageService;

    public RoomController(RoomService roomService, UserService userService, MessageService messageService) {
        this.roomService = roomService;
        this.userService = userService;
        this.messageService = messageService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyRooms() {

        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Map<String, Object>> myRooms = roomService.getRoomsByUser(name).stream().map(room -> {
            Map<String, Object> rsl = new HashMap<>();
            rsl.put("chatId", room.getChatId());

            User recipient = userService.findByUsername(room.getRecipientId()).orElse(new User());
            rsl.put("recipient", new UserInfo(recipient));

            User sender = userService.findByUsername(room.getSenderId()).orElse(new User());
            rsl.put("sender", new UserInfo(sender));

            rsl.put("count_message", messageService.countNewMessages(room.getSenderId(),
                    room.getRecipientId()));

            return rsl;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(myRooms);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createRoomIfNotExists(@RequestBody Map<String, String> input) {

        String senderName = SecurityContextHolder.getContext().getAuthentication().getName();
        String recipientName = input.get("username");

        String id = roomService.getChatId(senderName, recipientName, true).orElse("0");

        Map<String, String> rsl = new HashMap<>();
        rsl.put("id", id);
        return ResponseEntity.ok().body(rsl);
    }
}
