import {Nav} from "react-bootstrap";
import React from "react";

export function Exit(props) {

    const setAuthorized = props.setAuthorized

    const handleShow = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuthorized(false)
    }

    if (props.authorized) {
        return (
            <Nav.Link onClick={handleShow}>Выход</Nav.Link>
        )
    } else {
        return null
    }
}