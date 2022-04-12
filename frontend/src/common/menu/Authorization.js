import {useState} from "react";
import {Button, Form, Modal, Nav} from "react-bootstrap";

export function Authorization(props) {

    const uri = props.uri
    const setAuthorized = props.setAuthorized
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [error, setError] = useState("")

    const handleShow = (e) => {

        e.preventDefault()
        setError("")
        setShow(true)

    }

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const clickAuthorization = () => {
        let data = {
            "username": login,
            "password": password
        };

        let status = 0;

        fetch(uri + "/auth", {
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
                setError(data.error)
            } else {
                localStorage.setItem("token", data.token)
                console.log("token: " + data)
                setAuthorized(true)
                handleClose()
            }
        })
    }

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

                    <Form.Group className="mb-3">
                        <Form.Label>{error}</Form.Label>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={clickAuthorization}>
                        Авторизоваться
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}