package com.aryan.videochat.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void register(User user) {
        user.setStatus("online");
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User login(User user) {
        Optional<User> foundUserOpt = userRepository.findByEmail(user.getEmail());
        if (foundUserOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User foundUser = foundUserOpt.get();
        if (!foundUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Password incorrect");
        }
        foundUser.setStatus("online");
        return userRepository.save(foundUser);
    }

    @Transactional
    public void logout(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        Optional<User> foundUserOpt = userRepository.findByEmail(email);
        if (foundUserOpt.isEmpty()) {
            logger.info("User with email {} not found during logout.", email);
            throw new RuntimeException("User not found");
        }
        User foundUser = foundUserOpt.get();
        foundUser.setStatus("offline");
        userRepository.save(foundUser);
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
