import {useEffect, useState} from "react";
import {Button, Form, Modal, Nav} from "react-bootstrap";

export function Registration(props) {

    const uri = props.uri
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (e) => {
        e.preventDefault()
        setErrorUsername("")
        setErrorPassword("")
        setShow(true)
    }
    const setAuthorized = props.setAuthorized

    const [errorPassword, setErrorPassword] = useState("")
    const [errorUsername, setErrorUsername] = useState("")
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

    const clickRegister = () => {
        let data = {
            "username": login,
            "password": password,
            "confirmPassword": confirmPassword
        };

        let status = 0;

        fetch(uri + "/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            status = response.status
            return response.json()
        }).then((data) => {
            if (status === 400) {
                setErrorUsername(data.error)
            } else {
                localStorage.setItem("token", data.token)
                console.log("token: " + data)
                setAuthorized(true)
                handleClose()
            }
        })
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
                        <Form.Label>{errorUsername}</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={clickRegister}>
                        Зарегистрироваться
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}