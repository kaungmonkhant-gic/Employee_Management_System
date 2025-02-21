package ems.com.ems_project.config;


import ems.com.ems_project.service.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;
    
    // Constructor-based dependency injection
    @Autowired
    public JWTAuthFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // Check if Authorization header is present
        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);  // Proceed without JWT token if header is missing
            return;
        }

        // Extract the token from the "Authorization" header (remove the "Bearer " prefix)
        jwtToken = authHeader.substring(7);
        System.out.println("Extracted JWT token: " + jwtToken);  // Debug log

        // Extract the username (email) from the JWT token
        userEmail = jwtUtils.extractUsername(jwtToken);
        System.out.println("Extracted username: " + userEmail);  // Debug log

        // If username is not null and authentication is not yet set, proceed with the authentication
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                // Load user details using the extracted username (email)
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                System.out.println("Loaded user details: " + userDetails);  // Debug log

                // Check if the JWT token is valid
                if (jwtUtils.isTokenValid(jwtToken, userDetails)) {
                    System.out.println("Token is valid.");  // Debug log

                    // Create authentication token with authorities (roles) of the user
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());

                    // Log the user's authorities (roles)
                    System.out.println("User authorities: " + userDetails.getAuthorities());  // Debug log

                    // Set details of the authentication (request-based details)
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Set the authentication in the SecurityContext
                    securityContext.setAuthentication(token);
                    SecurityContextHolder.setContext(securityContext);
                    System.out.println("Authentication context set for user: " + userEmail);  // Debug log
                } else {
                    System.out.println("Invalid token for user: " + userEmail);  // Debug log
                }
            } catch (Exception e) {
                System.out.println("Error during authentication: " + e.getMessage());
                e.printStackTrace();  // Print the full stack trace for debugging
            }
        }

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }

}