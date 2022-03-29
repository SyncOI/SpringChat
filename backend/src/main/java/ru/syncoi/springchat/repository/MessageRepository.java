package ru.syncoi.springchat.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.syncoi.springchat.model.Message;
import ru.syncoi.springchat.model.MessageStatus;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    long countBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);

    List<Message> findByChatId(String chatId);
}
