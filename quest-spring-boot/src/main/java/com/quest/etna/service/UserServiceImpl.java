package com.quest.etna.service;

import com.quest.etna.model.User;
import com.quest.etna.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        Iterable it = userRepository.findAll();
        ArrayList<User> users = new ArrayList<>();
        it.forEach(e -> users.add((User) e));
        return users;
    }

    public Long count() {
        return userRepository.count();
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteById(Long userId) {

        userRepository.deleteById(Math.toIntExact(userId));
    }
}
