package com.priyansh.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public List getAllReservations() {
        return restTemplate.exchange(djangoUrl + "/reservations/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public List getUpcomingReservations() {
        return restTemplate.exchange(djangoUrl + "/reservations/upcoming/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map createReservation(Map reservation) {
        return restTemplate.postForObject(djangoUrl + "/reservations/", reservation, Map.class);
    }

    public void deleteReservation(Long id) {
        restTemplate.delete(djangoUrl + "/reservations/" + id + "/");
    }
}
