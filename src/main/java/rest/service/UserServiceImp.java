package rest.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import rest.model.Role;
import rest.model.User;
import rest.repositories.RoleRepository;
import rest.repositories.UserRepository;
import rest.security.UserDetailsImp;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private  final PasswordEncoder passwordEncoder;
    @Autowired
    public UserServiceImp(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findFirstByEmail(email); //TODO
        if (user == null) {
            throw new UsernameNotFoundException("User with this email not found.");
        }
        Hibernate.initialize(user.get().getRoles());
        return new UserDetailsImp(user.get(),user.get().getRoles());
    }
    @Override
    public List<User> index() {
        return userRepository.findAll();
    }

    //    Vremennoe  TODO
    @Override
    public User getUser(int id) {
        return  userRepository.findById(id).get();
    }

    @Override
    @Transactional
    public void create(User user) {
        userRepository.save(user);
    }

    //TODO
    public void creatP(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    @Override
    @Transactional
    public void update(User user) {
        userRepository.save(user);
    }
    @Override
    @Transactional
    public void delete(int id) {
        userRepository.deleteById(id);
    }
    @Override
    public List<Role> listAllRoles() {
        return roleRepository.findAll();
    }
}
