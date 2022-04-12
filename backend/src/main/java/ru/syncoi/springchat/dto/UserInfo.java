package ru.syncoi.springchat.dto;

import lombok.Getter;
import ru.syncoi.springchat.model.User;

@Getter
public class UserInfo {
    private String id;
    private String username;

    public UserInfo(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }
}
