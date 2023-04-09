package rest.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rest.model.Role;
import rest.model.User;
import rest.repositories.RoleRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoleCasting {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleCasting(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public User cast(User user) {
        List<Role> listRole = new ArrayList<>();
        for (Role role : roleRepository.findAll()) {
            for (Role userRole : user.getRoles()) {
                if (role.getRoleName().equals(userRole.getRoleName())) {
                    listRole.add(role);
                }
            }
        }
        user.setRoles(listRole);
        return user;
    }
}
