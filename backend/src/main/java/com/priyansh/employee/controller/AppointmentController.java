package com.priyansh.employee.controller;

import com.priyansh.employee.service.AppointmentService;
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
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/appointments")
    public List getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/appointments/upcoming")
    public List getUpcomingAppointments(@RequestParam String start, @RequestParam String end) {
        return appointmentService.getUpcomingAppointments(start, end);
    }

    @PostMapping("/appointments")
    public ResponseEntity<?> createAppointment(@RequestBody Map appointment) {
        try {
            return ResponseEntity.ok(appointmentService.createAppointment(appointment));
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        try {
            appointmentService.cancelAppointment(id);
            return ResponseEntity.ok("Appointment cancelled successfully");
        } catch (HttpClientErrorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
