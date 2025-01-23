package ems.com.ems_project.dto;

import ems.com.ems_project.validation.ValidEmail;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
	@ValidEmail
    private String email;
    private String password;
}

