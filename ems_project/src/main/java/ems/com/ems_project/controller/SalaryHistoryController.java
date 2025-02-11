package ems.com.ems_project.controller;
import ems.com.ems_project.model.SalaryHistory;
import ems.com.ems_project.service.SalaryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import dayjs from "dayjs";

@RestController
@RequestMapping("/salary-history")
public class SalaryHistoryController {

    @Autowired
    private SalaryHistoryService salaryHistoryService;

    @GetMapping
    public List<SalaryHistory> getAllSalaryHistories() {
        return salaryHistoryService.getAllSalaryHistories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalaryHistory> getSalaryHistoryById(@PathVariable Integer id) {
        SalaryHistory salaryHistory = salaryHistoryService.getSalaryHistoryById(id);
        return salaryHistory != null ? ResponseEntity.ok(salaryHistory) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public SalaryHistory createSalaryHistory(@RequestBody SalaryHistory salaryHistory) {
        return salaryHistoryService.createSalaryHistory(salaryHistory);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<SalaryHistory> updateSalaryHistory(
//            @PathVariable Integer id,
//            @RequestBody SalaryHistory salaryHistory) {
//        SalaryHistory updated = salaryHistoryService.updateSalaryHistory(id, salaryHistory);
//        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalaryHistory(@PathVariable Integer id) {
        salaryHistoryService.deleteSalaryHistory(id);
        return ResponseEntity.noContent().build();
    }
}
