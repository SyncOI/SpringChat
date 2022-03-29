package ru.syncoi.springchat.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.syncoi.springchat.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
