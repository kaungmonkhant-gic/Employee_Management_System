package ems.com.ems_project.service;

import org.springframework.stereotype.Service;

import ems.com.ems_project.model.Leaves;
import ems.com.ems_project.repository.LeavesRepository;

import java.util.List;

@Service
public class LeavesService {
    private final LeavesRepository leaveRepository;

    public LeavesService(LeavesRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public Leaves saveLeave(Leaves leave) {
        return leaveRepository.save(leave);
    }

    public List<Leaves> getAllLeaves() {
        return leaveRepository.findAll();
    }
}

