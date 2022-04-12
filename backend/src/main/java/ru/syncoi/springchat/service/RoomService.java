package ru.syncoi.springchat.service;

import org.springframework.stereotype.Service;
import ru.syncoi.springchat.model.Room;
import ru.syncoi.springchat.repository.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private RoomRepository repository;

    public RoomService(RoomRepository repository) {
        this.repository = repository;
    }

    public List<Room> getRoomsByUser(String senderId) {
        return repository.getAllBySenderId(senderId);
    }

    public Optional<String> getChatId(String senderId, String recipientId, boolean createIfNotExist) {
        return repository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(Room::getChatId)
                .or(() -> {
                    if (!createIfNotExist) {
                        return Optional.empty();
                    }

                    String chatId =
                            String.format("%s_%s", senderId, recipientId);

                    Room senderRecipient = Room.builder()
                            .chatId(chatId)
                            .senderId(senderId)
                            .recipientId(recipientId)
                            .build();

                    Room recipientSender = Room.builder()
                            .chatId(chatId)
                            .senderId(recipientId)
                            .recipientId(senderId)
                            .build();

                    repository.save(senderRecipient);
                    if (!senderId.equals(recipientId)) {
                        repository.save(recipientSender);
                    }

                    return Optional.of(chatId);
                });
    }
}
