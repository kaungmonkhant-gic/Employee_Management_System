package ems.com.ems_project.config;

//import ems.com.ems_project.service.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    
    @Autowired
    private JWTAuthFilter jwtAuthFilter;
    
    @Lazy
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        // Public routes
                        .requestMatchers("/auth/**").permitAll()

                        // All logged-in users can view their profile
                        .requestMatchers(HttpMethod.GET,"/employee/profile").authenticated()

                        .requestMatchers(HttpMethod.PUT, "/employee/profile/update").hasAnyAuthority("ROLE_Admin","ROLE_Manager")

                        // Employee management: Admin (CRUD), Manager (View)
                        .requestMatchers(HttpMethod.GET, "/employee/all","/employee/{id}").hasAnyAuthority("ROLE_Admin","ROLE_Manager")
                        .requestMatchers(HttpMethod.POST, "/employee/register").hasAuthority("ROLE_Admin")
                        .requestMatchers(HttpMethod.PUT, "/employee/update/**").hasAuthority("ROLE_Admin")
                        .requestMatchers(HttpMethod.DELETE, "/employee/delete/**").hasAuthority("ROLE_Admin")

                        // Salary management: Admin only
                        .requestMatchers("/salary/**","/leave/**").hasAuthority("ROLE_Admin")

                        // Attendance management: Admin & Manager
                        .requestMatchers("/attendance/**").hasAnyAuthority("ROLE_Admin", "ROLE_Manager")
                        .requestMatchers(HttpMethod.POST, "/attendance/mark").hasAuthority("ROLE_Employee")

                        // Leave management: Manager only
                        .requestMatchers("/leave/**").hasAuthority("ROLE_Manager")

                        // Default: All other requests need authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoderConfig.passwordEncoder());
        return daoAuthenticationProvider;
    }
    

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}