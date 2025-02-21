package ems.com.ems_project.common;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class LocalTimeDeserializer extends JsonDeserializer<LocalTime> {

    private static final DateTimeFormatter FORMATTER_12H = DateTimeFormatter.ofPattern("h:mm a");
    private static final DateTimeFormatter FORMATTER_24H = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override
    public LocalTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String timeString = p.getText();
        try {
            return LocalTime.parse(timeString, FORMATTER_12H); // Try 12-hour format
        } catch (DateTimeParseException e) {
            return LocalTime.parse(timeString, FORMATTER_24H); // Try 24-hour format
        }
    }
}


