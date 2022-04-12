package ru.syncoi.springchat.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.syncoi.springchat.dto.UserInfo;
import ru.syncoi.springchat.model.User;
import ru.syncoi.springchat.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.findAll();
        List<UserInfo> usersInfo = users.stream().map(UserInfo::new).collect(Collectors.toList());

        return ResponseEntity.ok(usersInfo);
    }
}
