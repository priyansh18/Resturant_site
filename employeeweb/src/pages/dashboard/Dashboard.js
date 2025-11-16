import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Dashboard = () =>{

    const [employees,setEmployees] = useState([]);

    const fetchEmployees = async()=>{
        try{
            const response = await fetch("http://localhost:8080/api/employees");
            const json = await response.json();
            setEmployees(json);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchEmployees();
    },[])

   
    return(
        <Container> 
            <div>
            <h1>Employee List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee)=>(
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </Container> 
    )
}


export default Dashboard;