package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AttendanceStatus {
    PRESENT("Present"),
    ABSENT("Absent"),
    FULL_LEAVE("Full Leave"),
    MORNING_HALF("Morning Half Leave"),
    EVENING_HALF("Evening Half Leave");

    private final String displayName;

    AttendanceStatus(String displayName) {
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
    public static AttendanceStatus fromJson(String value) {
        for (AttendanceStatus status : AttendanceStatus.values()) {
            if (status.displayName.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid AttendanceStatus: " + value);
    }
}

