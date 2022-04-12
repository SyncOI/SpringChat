import './Chat.css'
import Dialog from "./dialog/Dialog";
import ContactList from "./contact_list/ContactList";
import {useState} from "react";

function Chat(props) {

    const authorized = props.authorized
    const uri = props.uri
    const [currentDialog, setCurrentDialog] = useState("")

    if (!authorized) {
        return null
    }

    return (
        <main className="content">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <ContactList uri={uri}
                                     currentDialog = {currentDialog}
                                     setCurrentDialog = {setCurrentDialog}/>
                        <Dialog currentDialog={currentDialog}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chat