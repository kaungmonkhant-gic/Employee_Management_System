package ems.com.ems_project.common;

import org.springframework.stereotype.Component;

@Component

public class GenerateId {

    public String generateId(String lastId, String prefix) {
        int newNumber = 1; // Default for the first entity if no valid ID is provided

        if (lastId != null && !lastId.isEmpty()) {
            // Extract the numeric part of the ID (e.g., from "EMP001", get "001")
            String numberPart = lastId.replaceAll("[^0-9]", ""); // Extract only digits from the ID
            if (!numberPart.isEmpty()) {
                newNumber = Integer.parseInt(numberPart) + 1; // Increment the numeric part
            }
        }

//        // Extract the prefix (non-numeric part) of the ID (e.g., from "EMP001", get "EMP")
//        String prefix = lastId != null ? lastId.replaceAll("[0-9]", "") : ""; // Extract all non-numeric characters

        // Format the new ID (e.g., "EMP002", "DEP001", etc.)
        return String.format("%s%03d", prefix, newNumber);
    }

}
