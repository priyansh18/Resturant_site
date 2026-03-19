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
public class MealService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public List getAllMeals() {
        return restTemplate.exchange(djangoUrl + "/meals/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map getMealBySlug(String slug) {
        return restTemplate.getForObject(djangoUrl + "/meals/by-slug/" + slug + "/", Map.class);
    }

    public List getMealsByCategory(Long categoryId) {
        return restTemplate.exchange(djangoUrl + "/meals/by-category/" + categoryId + "/",
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map createMeal(Map meal) {
        return restTemplate.postForObject(djangoUrl + "/meals/", meal, Map.class);
    }

    public Map updateMeal(Long id, Map meal) {
        return restTemplate.exchange(djangoUrl + "/meals/" + id + "/",
                HttpMethod.PATCH, new HttpEntity<>(meal), Map.class).getBody();
    }

    public void deleteMeal(Long id) {
        restTemplate.delete(djangoUrl + "/meals/" + id + "/");
    }

    public List getAllCategories() {
        return restTemplate.exchange(djangoUrl + "/meal-categories/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map createCategory(Map category) {
        return restTemplate.postForObject(djangoUrl + "/meal-categories/", category, Map.class);
    }

    public void deleteCategory(Long id) {
        restTemplate.delete(djangoUrl + "/meal-categories/" + id + "/");
    }
}
