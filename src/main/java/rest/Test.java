package rest;

import rest.model.Role;
import rest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import rest.service.UserService;

@Component
public class Test {
    private final UserService userService;
    @Autowired
    public Test(UserService userService) {
        this.userService = userService;
    }



    @Bean
    @Transactional
    public void addDefaultUsers() {
        User user = new User("userFirstName", "userLastName",18 , "user@mail.ru","user");
        Role roleUser = new Role("ROLE_USER");
        user.setRole(roleUser);
//        roleUser.addUser(user);
        User admin = new User("adminFirstName", "adminLastName",22, "admin@mail.ru","admin");
        Role roleAdmin = new Role("ROLE_ADMIN");
        admin.setRole(roleAdmin);
//        admin.addRole(roleUser);
//        roleAdmin.addUser(admin);
        userService.create(user);
        userService.create(admin);
    }
}
