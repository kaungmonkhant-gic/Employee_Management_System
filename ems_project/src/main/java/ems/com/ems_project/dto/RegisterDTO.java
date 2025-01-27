package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import ems.com.ems_project.validation.ValidPhoneNumber;
import ems.com.ems_project.validation.ValidGender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RegisterDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Phone number is required")
    @ValidPhoneNumber
    private String phone;

    @NotBlank(message = "Gender is required")
    @ValidGender
    private String gender;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dob;

    private String nrc;

    @NotBlank(message = "Marital status is required")
    private String maritalStatus;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;

    @NotNull(message = "Position ID is required")
    private Integer positionId;

    @NotNull(message = "Role ID is required")
    private Integer roleId;

    @Size(max = 500, message = "Work experience should not exceed 500 characters")
    private String workExp; // Optional field

    @Size(max = 300, message = "Education should not exceed 300 characters")
    private String education; // Optional field
}
