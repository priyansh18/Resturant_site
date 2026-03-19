package com.priyansh.employee.controller;

import com.priyansh.employee.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    public List getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/reservations/upcoming")
    public List getUpcomingReservations() {
        return reservationService.getUpcomingReservations();
    }

    @PostMapping("/reservations")
    public Map createReservation(@RequestBody Map reservation) {
        return reservationService.createReservation(reservation);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok("Reservation cancelled successfully");
        } catch (HttpClientErrorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
