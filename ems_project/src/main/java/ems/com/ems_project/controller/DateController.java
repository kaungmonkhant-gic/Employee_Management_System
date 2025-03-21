package ems.com.ems_project.controller;

import ems.com.ems_project.service.DateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;


@RestController
@RequestMapping("/isWorkingDay")
public class DateController {
    @Autowired
    private DateService dateService;

    @GetMapping
    public ResponseEntity<?> isWorkingDay(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            boolean isWorkingDay = dateService.isWorkingDay(date);
            return ResponseEntity.ok(isWorkingDay);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid date format: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error checking working day: " + e.getMessage());
        }
    }
}
