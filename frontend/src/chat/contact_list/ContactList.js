import {Search} from "./Search";
import {Contact} from "./Contact";

function ContactList() {
    return (
        <div className="col-12 col-lg-5 col-xl-3 border-end">

            <Search />

            <Contact name="Vanessa Tucker" status="Online"
                     srcAvatar="https://bootdey.com/img/Content/avatar/avatar5.png"
                     notificationCount="5"/>
            <Contact name="illiam Harris" status="Online"
                     srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                     notificationCount="0"/>
            <Contact name="Kek Kekov" status="Online"
                     srcAvatar="https://bootdey.com/img/Content/avatar/avatar2.png"
                     notificationCount="1"/>
            <Contact name="Vanessa Tucker" status="Online"
                     srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                     notificationCount="2"/>

            <hr className="d-block d-lg-none mt-1 mb-0"/>
        </div>
    )
}

export default ContactList