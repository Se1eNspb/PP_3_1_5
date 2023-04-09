package rest.init;

import rest.model.Role;
import rest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import rest.service.UserService;

@Component
public class TestUsers {
    private final UserService userService;

    @Autowired
    public TestUsers(UserService userService) {
        this.userService = userService;
    }

    @Bean
    @Transactional
    public void addDefaultUsers() {
        User user = new User("userFirstName", "userLastName", 18, "user@mail.ru", "user");
        Role roleUser = new Role("ROLE_USER");
        user.setRole(roleUser);
        User admin = new User("adminFirstName", "adminLastName", 22, "admin@mail.ru", "admin");
        Role roleAdmin = new Role("ROLE_ADMIN");
        admin.setRole(roleAdmin);
        userService.create(user);
        userService.create(admin);
    }
}
