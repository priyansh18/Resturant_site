import './Header.css'
import {Navbar, Nav} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand to="/"><strong>Employee Management System</strong></Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Employees</Nav.Link>
                    <Nav.Link as={Link} to="/employee" className='Nav-Link'>Post Employee</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;