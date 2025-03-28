package ems.com.ems_project.common;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


public class LocalTimeDeserializer extends JsonDeserializer<LocalTime> {

    @Override
    public LocalTime deserialize(JsonParser jsonParser, DeserializationContext context) throws IOException {
        String timeString = jsonParser.getText().trim();

        // We will try different formats to ensure compatibility
        DateTimeFormatter formatter12 = DateTimeFormatter.ofPattern("h:mm a");  // e.g., "9:00 AM"
        DateTimeFormatter formatter24 = DateTimeFormatter.ofPattern("H:mm");    // e.g., "09:00"

        try {
            // First try parsing with 12-hour format (with AM/PM)
            return LocalTime.parse(timeString, formatter12);
        } catch (Exception e) {
            // If it fails, try parsing with 24-hour format
            return LocalTime.parse(timeString, formatter24);
        }
    }
}






