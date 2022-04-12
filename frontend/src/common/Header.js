import {Container, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import {Exit} from "./menu/Exit";
import {Authorization} from "./menu/Authorization";
import {Registration} from "./menu/Registration";
import {Profile} from "./menu/Profile";

function Header(props) {

    const authorized = props.authorized;
    const setAuthorized = props.setAthorized;
    const name = props.name;
    const uri = props.uri;

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img className="logo" src="https://i.kym-cdn.com/photos/images/newsfeed/002/205/307/1f7.jpg"
                         width="30" height="30" alt=""/>
                    <span className="logo">Hehe chat</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Profile autorized={authorized} name={name}/>
                        <Authorization authorized={authorized}
                                       uri={uri}
                                       setAuthorized={setAuthorized}/>
                        <Registration authorized={authorized}
                                      uri={uri}
                                      setAuthorized={setAuthorized}/>
                        <Exit authorized={authorized}
                              setAuthorized={setAuthorized}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header