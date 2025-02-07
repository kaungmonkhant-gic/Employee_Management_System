package ems.com.ems_project.service;

import org.springframework.stereotype.Service;

import ems.com.ems_project.model.Leave;
import ems.com.ems_project.repository.LeavesRepository;

import java.util.List;

@Service
public class LeavesService {
    private final LeavesRepository leaveRepository;

    public LeavesService(LeavesRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public Leave saveLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }
}

