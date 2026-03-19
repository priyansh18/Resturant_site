package com.priyansh.employee.controller;

import com.priyansh.employee.service.MealService;
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
public class MealController {

    private final MealService mealService;

    @GetMapping("/meals")
    public List getAllMeals() {
        return mealService.getAllMeals();
    }

    @GetMapping("/meals/{slug}")
    public ResponseEntity<?> getMealBySlug(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(mealService.getMealBySlug(slug));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/meals/category/{categoryId}")
    public List getMealsByCategory(@PathVariable Long categoryId) {
        return mealService.getMealsByCategory(categoryId);
    }

    @PostMapping("/meals")
    public Map createMeal(@RequestBody Map meal) {
        return mealService.createMeal(meal);
    }

    @PatchMapping("/meals/{id}")
    public ResponseEntity<?> updateMeal(@PathVariable Long id, @RequestBody Map meal) {
        try {
            return ResponseEntity.ok(mealService.updateMeal(id, meal));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/meals/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable Long id) {
        try {
            mealService.deleteMeal(id);
            return ResponseEntity.ok("Meal deleted successfully");
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/meal-categories")
    public List getAllCategories() {
        return mealService.getAllCategories();
    }

    @PostMapping("/meal-categories")
    public Map createCategory(@RequestBody Map category) {
        return mealService.createCategory(category);
    }

    @DeleteMapping("/meal-categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        mealService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully");
    }
}
