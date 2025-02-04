package ems.com.ems_project.service;
import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.model.Roles;
import ems.com.ems_project.repository.DepartmentsRepository;
import ems.com.ems_project.repository.PositionsRepository;
import ems.com.ems_project.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DropDownService {

    @Autowired
    private DepartmentsRepository departmentRepository;

    @Autowired
    private PositionsRepository positionRepository;

    @Autowired
    private RolesRepository roleRepository;

    public Map<String, List<String>> getDropdownData() {
        // Fetching all departments, positions, and roles
        List<Departments> departments = departmentRepository.findAll();
        List<Positions> positions = positionRepository.findAll();
        List<Roles> roles = roleRepository.findAll();

        // Preparing the data for the dropdown
        Map<String, List<String>> dropdownData = new HashMap<>();
        dropdownData.put("departments", departments.stream().map(Departments::getDepartmentName).collect(Collectors.toList()));
        dropdownData.put("positions", positions.stream().map(Positions::getPositionName).collect(Collectors.toList()));
        dropdownData.put("roles", roles.stream().map(Roles::getRoleName).collect(Collectors.toList()));

        return dropdownData;
    }
}

