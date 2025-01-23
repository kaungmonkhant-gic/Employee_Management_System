package ems.com.ems_project.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;

public class MaritalStatusValidator implements ConstraintValidator<ValidMaritalStatus, String> {

    private static final List<String> ALLOWED_STATUSES = Arrays.asList("Single", "Married", "Divorced");

    @Override
    public boolean isValid(String status, ConstraintValidatorContext context) {
        return status != null && ALLOWED_STATUSES.contains(status);
    }
}
