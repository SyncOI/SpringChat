import './Chat.css'
import Dialog from "./dialog/Dialog";
import ContactList from "./contact_list/ContactList";

function Chat(props) {
    return (
        <main className="content">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <ContactList />
                        <Dialog />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chat