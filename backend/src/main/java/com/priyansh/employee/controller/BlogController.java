package com.priyansh.employee.controller;

import com.priyansh.employee.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BlogController {

    private final BlogService blogService;

    @GetMapping("/posts")
    public List getAllPosts() {
        return blogService.getAllPosts();
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(blogService.getPostById(id));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/posts/search")
    public List searchPosts(@RequestParam String q) {
        return blogService.searchPosts(q);
    }

    @GetMapping("/posts/tag/{tag}")
    public List getPostsByTag(@PathVariable String tag) {
        return blogService.getPostsByTag(tag);
    }

    @GetMapping("/posts/category/{categoryId}")
    public List getPostsByCategory(@PathVariable Long categoryId) {
        return blogService.getPostsByCategory(categoryId);
    }

    @GetMapping("/posts/latest")
    public Map getLatestPost() {
        return blogService.getLatestPost();
    }

    @PostMapping("/posts")
    public Map createPost(@RequestBody Map post) {
        return blogService.createPost(post);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        blogService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully");
    }

    @GetMapping("/posts/{postId}/comments")
    public List getComments(@PathVariable Long postId) {
        return blogService.getCommentsByPost(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public Map addComment(@PathVariable Long postId, @RequestBody Map comment) {
        return blogService.addComment(postId, comment);
    }

    @GetMapping("/blog-categories")
    public List getAllCategories() {
        return blogService.getAllCategories();
    }

    @PostMapping("/blog-categories")
    public Map createCategory(@RequestBody Map category) {
        return blogService.createCategory(category);
    }
}
