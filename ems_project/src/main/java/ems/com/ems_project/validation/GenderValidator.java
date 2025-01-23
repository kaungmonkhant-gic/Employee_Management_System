package ems.com.ems_project.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;

public class GenderValidator implements ConstraintValidator<ValidGender, String> {

    private static final List<String> ALLOWED_GENDERS = Arrays.asList("Male", "Female", "Other");

    @Override
    public boolean isValid(String gender, ConstraintValidatorContext context) {
        return gender != null && ALLOWED_GENDERS.contains(gender);
    }
}
