package ems.com.ems_project.service.impl;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.repository.PositionsRepository;
import ems.com.ems_project.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PositionServiceImp implements PositionService {

    @Autowired
    private PositionsRepository positionsRepository;

    @Override
    public List<Positions> getAllPositions() {
        return positionsRepository.findAll();
    }
}
