package ems.com.ems_project.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class NRCValidator implements ConstraintValidator<ValidNRC, String> {

    private static final String NRC_REGEX = "^[0-9]{1,2}/[A-Za-z]{6}\\([A-Z]\\)[0-9]{6}$";

    @Override
    public boolean isValid(String nrc, ConstraintValidatorContext context) {
        if (nrc == null || nrc.trim().isEmpty()) {
            return false;
        }
        return Pattern.matches(NRC_REGEX, nrc);
    }
}
