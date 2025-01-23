package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import ems.com.ems_project.model.Employee;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private Employee employee;
    private EmployeeProfile employeeProfile;
    private List<Employee> employeeList;
    private List<EmployeeProfile> employeeProfiles;

}
