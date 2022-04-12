import './Chat.css'
import Dialog from "./dialog/Dialog";
import ContactList from "./contact_list/ContactList";

function Chat(props) {

    const authorized = props.authorized
    const uri = props.uri

    if (!authorized) {
        return null
    }

    return (
        <main className="content">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <ContactList uri={uri} />
                        <Dialog />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chat