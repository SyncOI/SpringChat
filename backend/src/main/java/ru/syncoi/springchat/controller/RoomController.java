package ru.syncoi.springchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.syncoi.springchat.dto.UserInfo;
import ru.syncoi.springchat.model.Room;
import ru.syncoi.springchat.model.User;
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

    public RoomController(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyRooms() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Map<String, Object>> myRooms = roomService.getRoomsByUser(name).stream().map(room -> {
            Map<String, Object> rsl = new HashMap<>();
            rsl.put("chatId", room.getChatId());
            rsl.put("recipient", new UserInfo(
                            userService.findByUsername(room.getRecipientId()).orElse(new User())
                    )
            );
            rsl.put("sender", new UserInfo(
                            userService.findByUsername(room.getSenderId()).orElse(new User())
                    )
            );
            return rsl;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(myRooms);
    }
}
