import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Dashboard = () =>{
    const navigate = useNavigate();
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

    const handleDelete = async (id) =>{
        try{
            const response = await fetch("http://localhost:8080/api/employee/" + id, {
                method: "DELETE"
            });

            if(response.ok){
                setEmployees((prev)=>prev.filter((employee)=>employee.id !== id));
            }
            const json = await response.json();
            setEmployees(json);
            navigate("/");
        }catch(error){
            console.log(error);
        }
    }

    const handleUpdate = (id) =>{
        navigate("/employee/" + id);
        
    }
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
                                <td>
                                    <Button variant="primary" onClick={()=>handleUpdate(employee.id)}>Update</Button>
                                    <Button variant="danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                                </td>
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