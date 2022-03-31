import {Button, Container, Form, Modal, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import {useState} from "react";

function Registration(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const [errorPassword, setErrorPassword] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const checkPassWithConfirmPass = (e) => {
        if (confirmPassword.length === 0) {
            return;
        }

        if (password === confirmPassword) {
            setErrorPassword("")
        } else {
            setErrorPassword("Пароли не равны!")
        }
    }

    if (props.authorized) {
        return null;
    }

    return (
        <>
            <Nav.Link onClick={handleShow}>Регистрация</Nav.Link>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Логин:</Form.Label>
                        <Form.Control type="email" value={login} onChange={(e) => setLogin(e.target.value)}
                                      placeholder="Введите логин"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Пароль:</Form.Label>
                        <Form.Control onBlur={checkPassWithConfirmPass} type="password" placeholder="Пароль"
                                      value={password}
                                      onChange={event => setPassword(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Подтверждение пароля:</Form.Label>
                        <Form.Control onBlur={checkPassWithConfirmPass} type="password"
                                      placeholder="Подтверждение пароля" value={confirmPassword}
                                      onChange={event => setConfirmPassword(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{errorPassword}</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Зарегистрироваться
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

function Authorization(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    if (props.authorized) {
        return null
    }

    return (
        <>
            <Nav.Link onClick={event => handleShow(event)}>Авторизация</Nav.Link>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Логин:</Form.Label>
                        <Form.Control type="email" value={login} onChange={(e) => setLogin(e.target.value)}
                                      placeholder="Введите логин"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Пароль:</Form.Label>
                        <Form.Control type="password" placeholder="Пароль"
                                      value={password}
                                      onChange={event => setPassword(event.target.value)}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Авторизоваться
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Exit(props) {
    if (props.authorized) {
        return (
            <Nav.Link href="">Выход</Nav.Link>
        )
    } else {
        return null
    }
}

function Header(props) {

    const authorized = props.autorized;
    const setAuthorized = props.setAthorized;

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
                        <Authorization authorized={authorized}/>
                        <Registration authorized={authorized}/>
                        <Exit authorized={authorized}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header