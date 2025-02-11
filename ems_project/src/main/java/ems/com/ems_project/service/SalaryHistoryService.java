package ems.com.ems_project.service;
import ems.com.ems_project.model.SalaryHistory;
import ems.com.ems_project.repository.SalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaryHistoryService {

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    public List<SalaryHistory> getAllSalaryHistories() {
        return salaryHistoryRepository.findAll();
    }

    public SalaryHistory getSalaryHistoryById(Integer id) {
        return salaryHistoryRepository.findById(id).orElse(null);
    }

    public SalaryHistory createSalaryHistory(SalaryHistory salaryHistory) {
        return salaryHistoryRepository.save(salaryHistory);
    }

//    public SalaryHistory updateSalaryHistory(Integer id, SalaryHistory updatedSalaryHistory) {
//        Optional<SalaryHistory> existing = salaryHistoryRepository.findById(id);
//        if (existing.isPresent()) {
//            SalaryHistory salaryHistory = existing.get();
//            salaryHistory.setBasicSalary(updatedSalaryHistory.getBasicSalary());
//            salaryHistory.setHouseAllowance(updatedSalaryHistory.getHouseAllowance());
//            salaryHistory.setOtFee(updatedSalaryHistory.getOtFee());
//            salaryHistory.setLateOver(updatedSalaryHistory.getLateOver());
//            salaryHistory.setLeaveOver(updatedSalaryHistory.getLeaveOver());
//            salaryHistory.setManualAdjustment(updatedSalaryHistory.getManualAdjustment());
//            salaryHistory.setBonus(updatedSalaryHistory.getBonus());
//            salaryHistory.setDate(updatedSalaryHistory.getDate());
//            salaryHistory.setPaid_by(updatedSalaryHistory.getPaid_by());
//            return salaryHistoryRepository.save(salaryHistory);
//        }
//        return null;
//    }

    public void deleteSalaryHistory(Integer id) {
        salaryHistoryRepository.deleteById(id);
    }
}

