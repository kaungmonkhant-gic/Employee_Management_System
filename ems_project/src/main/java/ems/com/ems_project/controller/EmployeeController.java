package ems.com.ems_project.controller;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.model.Leaves;
import ems.com.ems_project.model.Ots;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.model.Roles;
import ems.com.ems_project.model.SalaryHistory;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.DepartmentsRepository;
import ems.com.ems_project.repository.PositionsRepository;
import ems.com.ems_project.repository.RolesRepository;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.repository.LeavesRepository;
import ems.com.ems_project.repository.EmpDailyAttsRepository;
import ems.com.ems_project.repository.OtsRepository;
import ems.com.ems_project.repository.SalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentsRepository departmentsRepository;

    @Autowired
    private PositionsRepository positionsRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    @Autowired
    private LeavesRepository leavesRepository;

    @Autowired
    private EmpDailyAttsRepository empDailyAttsRepository;

    @Autowired
    private OtsRepository otsRepository;

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    // Add an employee
    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        // Validate and set the relationships (Department, Position, Role, etc.)
        employee.setDepartment(departmentsRepository.findById(employee.getDepartmentId()).orElse(null));
        employee.setPosition(positionsRepository.findById(employee.getPositionId()).orElse(null));
        employee.setRole(rolesRepository.findById(employee.getRoleId()).orElse(null));
        employee.setEmployeeSalary(employeeSalaryRepository.findById(employee.getEmployeeSalaryId()).orElse(null));

        // Save the employee to the database
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // Add a department
    @PostMapping("/department/add")
    public ResponseEntity<?> addDepartment(@RequestBody Departments department) {
        Departments savedDepartment = departmentsRepository.save(department);
        return ResponseEntity.ok(savedDepartment);
    }

    // Add a position
    @PostMapping("/position/add")
    public ResponseEntity<?> addPosition(@RequestBody Positions position) {
        Positions savedPosition = positionsRepository.save(position);
        return ResponseEntity.ok(savedPosition);
    }

    // Add a role
    @PostMapping("/role/add")
    public ResponseEntity<?> addRole(@RequestBody Roles role) {
        Roles savedRole = rolesRepository.save(role);
        return ResponseEntity.ok(savedRole);
    }

    // Add employee salary
    @PostMapping("/salary/add")
    public ResponseEntity<?> addEmployeeSalary(@RequestBody EmployeeSalary employeeSalary) {
        EmployeeSalary savedSalary = employeeSalaryRepository.save(employeeSalary);
        return ResponseEntity.ok(savedSalary);
    }

    // Add a leave record
    @PostMapping("/leave/add")
    public ResponseEntity<?> addLeave(@RequestBody Leaves leave) {
        Leaves savedLeave = leavesRepository.save(leave);
        return ResponseEntity.ok(savedLeave);
    }

    // Add daily attendance
    @PostMapping("/attendance/add")
    public ResponseEntity<?> addAttendance(@RequestBody EmpDailyAtts dailyAtt) {
        EmpDailyAtts savedAttendance = empDailyAttsRepository.save(dailyAtt);
        return ResponseEntity.ok(savedAttendance);
    }

    // Add overtime record
    @PostMapping("/overtime/add")
    public ResponseEntity<?> addOvertime(@RequestBody Ots overtime) {
        Ots savedOvertime = otsRepository.save(overtime);
        return ResponseEntity.ok(savedOvertime);
    }

    // Add salary history
    @PostMapping("/salary-history/add")
    public ResponseEntity<?> addSalaryHistory(@RequestBody SalaryHistory salaryHistory) {
        SalaryHistory savedHistory = salaryHistoryRepository.save(salaryHistory);
        return ResponseEntity.ok(savedHistory);
    }
}
