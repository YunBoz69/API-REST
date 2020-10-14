package com.quest.etna.service;

import com.quest.etna.model.User;

public interface UserService {

    void save(User user);

    User findByUsername(String username);
}
