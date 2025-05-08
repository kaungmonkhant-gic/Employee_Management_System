package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum LeaveType {
    ANNUAL("Annual Leave"),
    CASUAL("Casual Leave"),
    MEDICAL("Medical Leave"),
    UNPAID("Unpaid Leave");

    private final String displayName;

    LeaveType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @JsonValue // Converts ENUM to JSON (e.g., "ANNUAL" -> "Annual Leave")
    public String toJson() {
        return displayName;
    }

    @JsonCreator // Converts JSON string back to ENUM (e.g., "Annual Leave" -> ANNUAL)
    public static LeaveType fromJson(String value) {
        for (LeaveType type : LeaveType.values()) {
            if (type.displayName.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid LeaveType: " + value);
    }
}