package ru.syncoi.springchat.dto;

import lombok.Getter;
import ru.syncoi.springchat.model.User;

@Getter
public class RegisterForm {
    private String username;
    private String password;
    private String confirmPassword;

    public User toUser() {
        User rsl = new User();
        rsl.setUsername(username);
        rsl.setPassword(password);

        return rsl;
    }
}
