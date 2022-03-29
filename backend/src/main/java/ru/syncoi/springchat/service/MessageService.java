package ru.syncoi.springchat.service;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import ru.syncoi.springchat.exception.MessageNotFoundException;
import ru.syncoi.springchat.model.Message;
import ru.syncoi.springchat.model.MessageStatus;
import ru.syncoi.springchat.repository.MessageRepository;

import java.util.ArrayList;
import java.util.List;


@Service
public class MessageService {

    private MessageRepository repository;
    private RoomService roomService;
    private MongoOperations mongoOperations;

    public MessageService(MessageRepository repository, RoomService roomService, MongoOperations mongoOperations) {
        this.repository = repository;
        this.roomService = roomService;
        this.mongoOperations = mongoOperations;
    }

    public Message save(Message message) {
        message.setStatus(MessageStatus.RECEIVED);
        repository.save(message);

        return message;
    }

    public List<Message> findChatMessages(String senderId, String recipientId) {
        var chatId = roomService.getChatId(senderId, recipientId, false);

        var messages =
                chatId.map(cId -> repository.findByChatId(cId)).orElse(new ArrayList<>());

        if(messages.size() > 0) {
            updateStatuses(senderId, recipientId, MessageStatus.DELIVERED);
        }

        return messages;
    }

    public long countNewMessages(String senderId, String recipientId) {
        return repository.countBySenderIdAndRecipientIdAndStatus(senderId,
                recipientId,
                MessageStatus.RECEIVED);
    }

    public Message findById(String id) {
        return repository
                .findById(id)
                .map(message -> {
                    message.setStatus(MessageStatus.DELIVERED);
                    return repository.save(message);
                })
                .orElseThrow(() -> new MessageNotFoundException("Message with id " + id + " wasn't found"));
    }

    public void updateStatuses(String senderId, String recipientID, MessageStatus status) {
        Query query = new Query(
                Criteria.where("senderId").is(senderId)
                        .and("recipientID").is(recipientID)
        );
        Update update = Update.update("status", status);
        mongoOperations.updateMulti(query, update, Message.class);
    }
}
