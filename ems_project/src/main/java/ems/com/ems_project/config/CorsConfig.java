package ems.com.ems_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all endpoints
                        .allowedOrigins("http://localhost:4000", "http://localhost:3000") // Allowed
                        // origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH") //
                        // Allowed methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true) // Allow credentials like cookies or HTTP
                        // authentication
                        .maxAge(3600); // Cache the preflight response for 1 hour (3600 seconds)
            }
        };
    }
}
