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
public class ChefService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public List getAllChefs() {
        return restTemplate.exchange(djangoUrl + "/chefs/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map getChefById(Long id) {
        return restTemplate.getForObject(djangoUrl + "/chefs/" + id + "/", Map.class);
    }

    public Map createChef(Map chef) {
        return restTemplate.postForObject(djangoUrl + "/chefs/", chef, Map.class);
    }

    public Map updateChef(Long id, Map chef) {
        return restTemplate.exchange(djangoUrl + "/chefs/" + id + "/",
                HttpMethod.PATCH, new HttpEntity<>(chef), Map.class).getBody();
    }

    public void deleteChef(Long id) {
        restTemplate.delete(djangoUrl + "/chefs/" + id + "/");
    }
}
