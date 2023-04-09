package rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import rest.model.User;
import rest.service.UserService;
import rest.util.RoleCasting;

import java.util.List;

@Controller
@RequestMapping("/rest")
public class AdminRestController {
    private final UserService userService;
    private final RoleCasting roleCasting;

    @Autowired
    public AdminRestController(UserService userService, RoleCasting roleCasting) {
        this.userService = userService;
        this.roleCasting = roleCasting;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        roleCasting.cast(user);
        userService.create(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User user) {
        roleCasting.cast(user);
        userService.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
