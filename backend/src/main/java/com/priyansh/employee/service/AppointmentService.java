package com.priyansh.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public List getAllAppointments() {
        return restTemplate.exchange(djangoUrl + "/appointments/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public List getUpcomingAppointments(String start, String end) {
        return restTemplate.exchange(
                djangoUrl + "/appointments/upcoming/?start=" + start + "&end=" + end,
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map createAppointment(Map appointment) {
        Map<String, Object> checkBody = Map.of("date_time", appointment.get("dateTime"));
        Map result = restTemplate.postForObject(djangoUrl + "/appointments/check-slot/", checkBody, Map.class);
        if (result != null && Boolean.TRUE.equals(result.get("exists"))) {
            throw new IllegalStateException("Time slot already booked");
        }
        Map<String, Object> body = new HashMap<>();
        body.put("name", appointment.get("name"));
        body.put("email", appointment.get("email"));
        body.put("date_time", appointment.get("dateTime"));
        body.put("reason", appointment.get("reason"));
        return restTemplate.postForObject(djangoUrl + "/appointments/", body, Map.class);
    }

    public void cancelAppointment(Long id) {
        restTemplate.delete(djangoUrl + "/appointments/" + id + "/");
    }
}
