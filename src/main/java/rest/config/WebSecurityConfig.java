package rest.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import rest.service.UserService;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   private final UserService userService;
   private  final SuccessUserHandler successUserHandler;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public WebSecurityConfig(UserService userService, SuccessUserHandler successUserHandler, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.successUserHandler = successUserHandler;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.userDetailsService(userService).passwordEncoder(NoOpPasswordEncoder.getInstance());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors(cors -> cors.disable())
                //TODO delete after debug
                .authorizeRequests()
                .anyRequest().permitAll()
                //
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/user").hasAnyRole("USER","ADMIN")
//                .anyRequest().permitAll()
                //
                .and()
                .formLogin()
                .successHandler(successUserHandler)
                .loginPage("/login")
                .usernameParameter("email")
                .failureUrl("/login?error")
        ;
    }
}
