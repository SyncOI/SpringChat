package ru.syncoi.springchat.dto;

import lombok.Getter;
import ru.syncoi.springchat.model.User;

import java.util.Random;

@Getter
public class UserInfo {
    private String id;
    private String username;
    private String avatarId;

    public UserInfo(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.avatarId = String.valueOf(new Random().nextInt(8) + 1);
    }
}
