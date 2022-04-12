import {Search} from "./Search";
import {Contact} from "./Contact";
import {useEffect, useState} from "react";
import {ButtonCreateNewRoom} from "./ButtonCreateNewRoom";

function ContactList(props) {

    const currentDialog = props.currentDialog
    const setCurrentDialog = props.setCurrentDialog
    const uri = props.uri
    const [items, setItems] = useState([])

    const contactUpdate = () => {
        fetch(uri + "/room/my", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setItems(data)
        })
    }

    useEffect(() => contactUpdate(), [])

    return (
        <div className="col-12 col-lg-5 col-xl-3 border-end">

            <Search/>
            <ButtonCreateNewRoom contactUpdate={contactUpdate}
                                 setCurrentDialog={setCurrentDialog}
                                 uri={uri}/>

            {items.map(item => (
                <Contact key={item.recipient.id}
                         id={item.recipient.id}
                         currentDialog={currentDialog}
                         setCurrentDialog={setCurrentDialog}
                         srcAvatar={"https://bootdey.com/img/Content/avatar/avatar" + item.recipient.avatarId + ".png"}
                         name={item.recipient.username} status="Online"
                         notificationCount={item.count_message}
                />
            ))}

            <hr className="d-block d-lg-none mt-1 mb-0"/>
        </div>
    )
}

export default ContactList