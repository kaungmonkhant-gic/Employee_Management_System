package ems.com.ems_project.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = MaritalStatusValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidMaritalStatus {
    String message() default "Marital status must be 'Single', 'Married', or 'Divorced'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

