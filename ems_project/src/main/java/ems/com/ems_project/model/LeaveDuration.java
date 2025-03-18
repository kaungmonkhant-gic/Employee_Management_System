package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum LeaveDuration {
    FULL_LEAVE("Full Leave"),
    MORNING_HALF("Morning Half Leave"),
    EVENING_HALF("Evening Half Leave");

    private final String displayName;

    LeaveDuration(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @JsonValue
    @Override
    public String toString() {
        return displayName;
    }

    @JsonCreator
    public static LeaveDuration fromJson(String value) {
        for (LeaveDuration duration : LeaveDuration.values()) {
            if (duration.displayName.equalsIgnoreCase(value)) {
                return duration;
            }
        }
        throw new IllegalArgumentException("Invalid LeaveDuration: " + value);
    }
}

