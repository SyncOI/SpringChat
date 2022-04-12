import {Nav} from "react-bootstrap";
import React from "react";

export function Profile(props) {
    if (!props.autorized) {
        return null
    }

    return (
        <Nav.Link>Профиль ({props.name})</Nav.Link>
    )
}