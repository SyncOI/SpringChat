export function Contact(props) {
    return <a href="#" className="list-group-item list-group-item-action border-0">
        <div className="badge bg-success float-end">{props.notificationCount > 0 && props.notificationCount}</div>
        <div className="d-flex align-items-start">
            <img src={props.srcAvatar}
                 className="rounded-circle me-1" alt={props.name} width="40" height="40"/>
            <div className="flex-grow-1 ms-3">
                {props.name}
                <div className="small">
                    <span className="fas fa-circle chat-online"/> {props.status} </div>
            </div>
        </div>
    </a>;
}