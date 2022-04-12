import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useState} from "react";
import React from "react";

export function ButtonCreateNewRoom(props) {

    const contactUpdate = props.contactUpdate
    const uri = props.uri
    const setCurrentDialog = props.setCurrentDialog
    const [show, setShow] = useState(false)

    const chooseNewDialog = (e) => {
        e.preventDefault()

        let username = e.currentTarget.attributes['contact_username'].value
        setCurrentDialog(username)

        fetch(uri + "/room/new", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({username: username})
        }).then((response) => {
            contactUpdate()
        })

        handleClose()
    }

    const [contacts, setContacts] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)

        fetch(uri + "/user/all", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setContacts(data)
        })
    }

    return (
        <>
            <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <Button onClick={handleShow} className="btn form-control mb-2">Создать новый чат</Button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать новый чат</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {contacts.map(value => (
                            <a key={value.id} onClick={chooseNewDialog}
                               className="list-group-item list-group-item-action" aria-current="true"
                               contact_username={value.username} >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{value.username}</h5>
                                </div>
                            </a>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    )
}