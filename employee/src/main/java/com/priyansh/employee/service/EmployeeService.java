package com.priyansh.employee.service;

import com.priyansh.employee.entity.Employee;
import com.priyansh.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

   public Employee postEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getEmployees(){
       return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
       if(!employeeRepository.existsById(id))
           throw new EntityNotFoundException("Employee not found");
       employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){
       return employeeRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Employee not found"));
    }

    public Employee updateEmployee(Long id, Employee employee){
       Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmp = optionalEmployee.get();
            existingEmp.setName(employee.getName());
            existingEmp.setEmail(employee.getEmail());
            existingEmp.setPhone(employee.getPhone());
            existingEmp.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingEmp);
        }

        return null;
    }

}
