package rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import rest.dto.UserDTO;
import rest.model.Role;
import rest.model.User;
import rest.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//TODO
@Controller
@RequestMapping("/rest")
public class AdminRestController {
    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    @ResponseBody
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream().map(this::convertToUserDTO).toList();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public UserDTO getUser(@PathVariable("id") int id) {
        return convertToUserDTO(userService.getUser(id));
    }


    //    @PostMapping("/add")
    public ResponseEntity<HttpStatus> add1(@RequestBody UserDTO userDTO) {
        userService.create(convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public UserDTO add(@RequestBody UserDTO userDTO) {
        User user = convertToUser(userDTO);
        userService.create(user);
        System.out.println(user.getId());    // TODO
        return convertToUserDTO(user);
    }

    @PutMapping
    @ResponseBody
    public UserDTO update(@RequestBody UserDTO userDTO) {
        User user = convertToUser(userDTO);
        user.setId(userDTO.getId());
        userService.update(user);
        return convertToUserDTO(user);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "User with id = " + id + " was deleted.";
    }

    private User convertToUser(UserDTO userDTO) {
        User user = new User(userDTO.getFirstName()
                , userDTO.getLastName(), userDTO.getAge()
                , userDTO.getEmail(), userDTO.getPassword());
        for (Role role : userService.listAllRoles()) {
            for (String roleDto : userDTO.getRoles()) {
                if (role.getRoleName().equals(roleDto)) {
                    user.setRole(role);
                }
            }
        }
        return user;
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setAge(user.getAge());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        List<String> roles = user.getRoles().stream().map(Role::getRoleName).toList();
        userDTO.setRoles(roles);
        return userDTO;
    }


}
