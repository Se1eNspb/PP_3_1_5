package rest.controllers;

import rest.security.UserDetailsImp;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/")
    public String start() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "/login";
    }

    @GetMapping("/user")
    public String userPage(Model model) {
        UserDetailsImp details = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", details.getUser());
        return "user/user";
    }
    @GetMapping("/index")
    public String index(Model model) {
        UserDetailsImp details = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", details.getUser());
        return "index";
    }
}

