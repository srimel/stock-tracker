import './Navigation.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faChartLine,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            <Nav.Link as={NavLink} to="/">
              <FontAwesomeIcon icon={faHouse} /> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Compare">
              <FontAwesomeIcon icon={faChartLine} /> Comparison
            </Nav.Link>
            <Nav.Link as={NavLink} to="/news">
              <FontAwesomeIcon icon={faNewspaper} /> News
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Details">
              <FontAwesomeIcon icon={faChartLine} /> Profiles
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
