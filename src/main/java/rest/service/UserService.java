package rest.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import rest.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> getAllUsers();

    User getUser(int id);

    void create(User user);

    void update(User user);

    void delete(int id);
}
