package rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import rest.dto.UserDTO;
import rest.model.Role;
import rest.model.User;
import rest.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/rest")
public class AdminRestController {
    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping
    @ResponseBody
    public List<UserDTO> index() {
        return userService.index().stream().map(this::convertToUserDTO).toList();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public UserDTO getUser(@PathVariable("id") int id) {
        return convertToUserDTO(userService.getUser(id));
    }

    @PostMapping
    @ResponseBody
    public UserDTO add(@RequestBody UserDTO userDTO) {
        User user = convertToUser(userDTO);
        userService.create(user);
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
                    user.addRole(role);
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
