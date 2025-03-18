package ems.com.ems_project.service;

import ems.com.ems_project.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Component
public class DateUtils {

    @Autowired
    private HolidayRepository holidayRepository;

    // Method to check if a date is a working day
    public boolean isWorkingDay(LocalDate date) {
        return !(date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY || isPublicHoliday(date));
    }

    // Method to check if a date is a public holiday
    public boolean isPublicHoliday(LocalDate date) {
        return holidayRepository.existsByDate(date);  // Checks if the date exists in the holiday database
    }
}
