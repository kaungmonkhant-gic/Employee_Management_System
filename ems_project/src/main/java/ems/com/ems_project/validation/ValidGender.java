package ems.com.ems_project.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = GenderValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidGender {
    String message() default "Gender must be either 'Male', 'Female', or 'Other'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
