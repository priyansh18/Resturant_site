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
public class BlogService {

    private final RestTemplate restTemplate;

    @Value("${django.service.url}")
    private String djangoUrl;

    public List getAllPosts() {
        return restTemplate.exchange(djangoUrl + "/posts/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map getPostById(Long id) {
        return restTemplate.getForObject(djangoUrl + "/posts/" + id + "/", Map.class);
    }

    public List searchPosts(String query) {
        return restTemplate.exchange(djangoUrl + "/posts/search/?q=" + query,
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public List getPostsByTag(String tag) {
        return restTemplate.exchange(djangoUrl + "/posts/by-tag/" + tag + "/",
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public List getPostsByCategory(Long categoryId) {
        return restTemplate.exchange(djangoUrl + "/posts/by-category/" + categoryId + "/",
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map getLatestPost() {
        return restTemplate.getForObject(djangoUrl + "/posts/latest/", Map.class);
    }

    public Map createPost(Map post) {
        return restTemplate.postForObject(djangoUrl + "/posts/", post, Map.class);
    }

    public void deletePost(Long id) {
        restTemplate.delete(djangoUrl + "/posts/" + id + "/");
    }

    public List getCommentsByPost(Long postId) {
        return restTemplate.exchange(djangoUrl + "/posts/" + postId + "/comments/",
                HttpMethod.GET, null, new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map addComment(Long postId, Map comment) {
        return restTemplate.postForObject(djangoUrl + "/posts/" + postId + "/comments/", comment, Map.class);
    }

    public List getAllCategories() {
        return restTemplate.exchange(djangoUrl + "/blog-categories/", HttpMethod.GET, null,
                new ParameterizedTypeReference<List>() {}).getBody();
    }

    public Map createCategory(Map category) {
        return restTemplate.postForObject(djangoUrl + "/blog-categories/", category, Map.class);
    }
}
