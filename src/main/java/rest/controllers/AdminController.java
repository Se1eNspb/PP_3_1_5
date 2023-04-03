package rest.controllers;

import rest.model.Role;
import rest.model.User;
import rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping()
    public String index(Model model) {
        model.addAttribute("users", userService.index());
        List<Role> listOfRoles = userService.listAllRoles();
        model.addAttribute("listOfRoles", listOfRoles);
        return "/admin/admin";
    }
    @PostMapping("/create")
    public String create(User user) {
        userService.create(user);
        return "redirect:/admin";
    }
    @PatchMapping("/{id}")
    public String update(@PathVariable("id") int id, User user) {
        user.setId(id);
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
