import './UpdateEmployee.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/employee/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setData(json);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/employee/' + id
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      <div className="center-form">
        <h1> Update Employee</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={data.department}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Edit Employee
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateEmployee;
