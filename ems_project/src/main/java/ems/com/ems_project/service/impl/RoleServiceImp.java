package ems.com.ems_project.service.impl;
import ems.com.ems_project.model.Roles;
import ems.com.ems_project.repository.RolesRepository;
import ems.com.ems_project.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService {

    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }
}
