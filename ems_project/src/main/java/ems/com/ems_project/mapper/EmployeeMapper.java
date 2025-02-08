package ems.com.ems_project.mapper;

import ems.com.ems_project.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    // Map Employee DTO to Entity
    @Mapping(target = "password", ignore = true) // Password will be set separately
    @Mapping(target = "authorities", ignore = true) // Authorities are derived from roles
    @Mapping(target = "department", ignore = true) // Department will be set manually
    @Mapping(target = "position", ignore = true) // Position will be set manually
    @Mapping(target = "role", ignore = true) // Role will be set manually
    Employee toEmployee(Employee employeeDTO);

    // Map EmployeeSalary DTO to Entity
    @Mapping(target = "id", ignore = true) // Ignore ID (auto-generated)
    @Mapping(target = "employee", source = "employee") // Automatically map the Employee relationship
    EmployeeSalary toEmployeeSalary(Employee employee, EmployeeSalary employeeSalaryDTO);

    // Map EmployeeLeave DTO to Entity
    @Mapping(target = "id", ignore = true) // Ignore ID (auto-generated)
    @Mapping(target = "employee", source = "employee") // Automatically map the Employee relationship
    EmployeeLeave toEmployeeLeave(Employee employee, EmployeeLeave employeeLeaveDTO);
}
