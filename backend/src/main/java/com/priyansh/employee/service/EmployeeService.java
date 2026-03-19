package com.priyansh.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public Map postEmployee(Map employee) {
        return restTemplate.postForObject(djangoUrl + "/employees/", employee, Map.class);
    }

    public List getEmployees() {
        return restTemplate.exchange(djangoUrl + "/employees/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public void deleteEmployee(Long id) {
        restTemplate.delete(djangoUrl + "/employees/" + id + "/");
    }

    public Map getEmployeeById(Long id) {
        return restTemplate.getForObject(djangoUrl + "/employees/" + id + "/", Map.class);
    }

    public Map updateEmployee(Long id, Map employee) {
        return restTemplate.exchange(djangoUrl + "/employees/" + id + "/",
                HttpMethod.PATCH, new HttpEntity<>(employee), Map.class).getBody();
    }
}
