package com.priyansh.employee.controller;

import com.priyansh.employee.service.ChefService;
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
public class ChefController {

    private final ChefService chefService;

    @GetMapping("/chefs")
    public List getAllChefs() {
        return chefService.getAllChefs();
    }

    @GetMapping("/chefs/{id}")
    public ResponseEntity<?> getChefById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(chefService.getChefById(id));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/chefs")
    public Map createChef(@RequestBody Map chef) {
        return chefService.createChef(chef);
    }

    @PatchMapping("/chefs/{id}")
    public ResponseEntity<?> updateChef(@PathVariable Long id, @RequestBody Map chef) {
        try {
            return ResponseEntity.ok(chefService.updateChef(id, chef));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/chefs/{id}")
    public ResponseEntity<?> deleteChef(@PathVariable Long id) {
        chefService.deleteChef(id);
        return ResponseEntity.ok("Chef deleted successfully");
    }
}
