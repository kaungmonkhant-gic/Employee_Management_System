package ems.com.ems_project.model;

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
}

