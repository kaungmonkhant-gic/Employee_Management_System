package ems.com.ems_project.dto;
import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.model.Ots;
import lombok.Data;

@Data
public class SalaryDTO {
    private String employeeId;
    private String employeeName;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Integer lateMinutes;
    private Integer otTime;// From Employee Daily Attendance
    private Double unpaidLeave;  // From Employee Leave/

    public SalaryDTO(EmployeeSalary employeeSalary,String employeeName, Integer lateMinutes,  Integer otTime, Double unpaidLeave) {
        this.employeeId = employeeSalary.getEmployee().getId();
        this.employeeName = employeeName;
        this.basicSalary = employeeSalary.getPositionSalary().getBasicSalary();
        this.houseAllowance = employeeSalary.getPositionSalary().getHouseAllowance();
        this.transportation = employeeSalary.getPositionSalary().getTransportation();
        this.lateMinutes = (lateMinutes != null) ? lateMinutes : 0;  // default value if null
        this.otTime = (otTime != null) ? otTime : 0;  // default value if null
        this.unpaidLeave = (unpaidLeave != null) ? unpaidLeave : 0.0;
        // totalSalary can be removed if no calculation is needed
    }

//    @Service
//    public class SalaryService {
//
//        @Autowired
//        private SalaryRepository salaryRepository;
//
//        public List<EmployeeSalaryResponse> getEmployeeSalaries() {
//            List<Object[]> results = salaryRepository.getEmployeeSalaryDetails();
//
//            return results.stream().map(result -> new EmployeeSalaryResponse(
//                    (String) result[0],  // employee_id
//                    (String) result[1],  // employee_name
//                    (String) result[2],  // total_ot_time
//                    ((Number) result[3]).intValue(), // total_late_min
//                    ((Number) result[4]).intValue(), // total_unpaid_leave
//                    ((Number) result[5]).doubleValue(), // basic_salary
//                    ((Number) result[6]).doubleValue(), // house_allowance
//                    ((Number) result[7]).doubleValue()  // transportation
//            )).collect(Collectors.toList());
//        }
//    }


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getHouseAllowance() {
        return houseAllowance;
    }

    public void setHouseAllowance(Double houseAllowance) {
        this.houseAllowance = houseAllowance;
    }

    public Double getTransportation() {
        return transportation;
    }

    public void setTransportation(Double transportation) {
        this.transportation = transportation;
    }

    public Integer getLateMinutes() {
        return lateMinutes;
    }

    public void setLateMinutes(Integer lateMinutes) {
        this.lateMinutes = lateMinutes;
    }

    public Double getUnpaidLeave() {
        return unpaidLeave;
    }

    public void setUnpaidLeave(Double unpaidLeave) {
        this.unpaidLeave = unpaidLeave;
    }

    public Integer getOtTime() {
        return otTime;
    }

    public void setOtTime(Integer otTime) {
        this.otTime = otTime;
    }
}

