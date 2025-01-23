package ems.com.ems_project.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;

public class DOBValidator implements ConstraintValidator<ValidDOB, Date> {

    @Override
    public boolean isValid(Date dob, ConstraintValidatorContext context) {
        if (dob == null) {
            return false;
        }

        LocalDate birthDate = new java.sql.Date(dob.getTime()).toLocalDate();
        LocalDate today = LocalDate.now();

        // Check if the date is in the past
        if (birthDate.isAfter(today)) {
            return false;
        }

        // Check if the employee is at least 18 years old
        return Period.between(birthDate, today).getYears() >= 18;
    }
}
