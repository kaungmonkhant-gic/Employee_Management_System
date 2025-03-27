package ems.com.ems_project.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.*;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private DailyAttendanceRepository attendanceRepository;
    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private OtRepository otRepository;

    @Override
    public List<EmployeeSalaryDTO> getAllSalaries() {
        return employeeRepository.findAll().stream()
                .filter(employee -> employee.getResignDate() == null)  // Exclude resigned employees
                .map(employee -> new EmployeeSalaryDTO(employee))  // Use the constructor that takes Employee to get PositionSalary details
                .toList();
    }

    public List<SalaryDTO> getAllEmployeeSalaryDetails(int year, int month) {
        List<Employee> employees = employeeRepository.findAll();

        // Calculate the start date (25th of the previous month)
        LocalDate startDate = LocalDate.of(year, month, 1).minusMonths(1).withDayOfMonth(25);

        // Calculate the end date (26th of the current month)
        LocalDate endDate = LocalDate.of(year, month, 1).withDayOfMonth(26);

        return employees.stream().map(employee -> {
            try {
                if (employee == null || employee.getPositionSalary() == null) {
                    return null; // Skip invalid records
                }
                String employeeId = employee.getId();
                String employeeName = employee.getName();

                // Fetch related records safely, with date range for late minutes
                Integer lateMinutes = attendanceRepository.findTotalLateMinutesByEmployeeIdAndDateRange(employeeId, startDate, endDate);
                Integer otTime = otRepository.findTotalOTTimeByEmployeeIdAndDateRange(employeeId, startDate, endDate);
                Double unpaidLeave = employeeLeaveRepository.findTotalUnpaidLeaveByEmployeeId(employeeId);

                // Handle null cases
                lateMinutes = (lateMinutes != null) ? lateMinutes : 0;
                otTime = (otTime != null) ? otTime : 0;
                unpaidLeave = (unpaidLeave != null) ? unpaidLeave : 0.0;

                return new SalaryDTO(employee, lateMinutes, otTime, unpaidLeave);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }).filter(dto -> dto != null).collect(Collectors.toList());
    }

}
