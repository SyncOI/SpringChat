import React from "react";
import './Chat.css'
import Dialog from "./dialog/Dialog";
import ContactList from "./contact_list/ContactList";
import {useEffect, useState} from "react";

function Chat(props) {

    const authorized = props.authorized
    const uri = props.uri
    const [currentDialog, setCurrentDialog] = useState("")
    const [roomInfo, setRoomInfo] = useState({})

    useEffect(() => {
        if (currentDialog === "" || !authorized) {
            return;
        }

        fetch(uri + "/room/" + currentDialog, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setRoomInfo(data)
        })
    }, [currentDialog])

    if (!authorized) {
        return null
    }

    return (
        <main className="content">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <ContactList uri={uri}
                                     currentDialog={currentDialog}
                                     setCurrentDialog={setCurrentDialog}/>
                        <Dialog uri={uri}
                                roomInfo={roomInfo}
                                currentDialog={currentDialog}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chat