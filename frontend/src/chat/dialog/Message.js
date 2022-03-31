export function Message(props) {
    const avatarWidth = 40;
    const avatarHeight = 40;

    let elementClass = '';
    let messageClass = '';

    if (props.direction === 'out') {
        elementClass = 'chat-message-right pb-4';
        messageClass = 'flex-shrink-1 bg-light rounded py-2 px-3 me-3';
    } else if (props.direction === 'in') {
        elementClass = 'chat-message-left pb-4';
        messageClass = 'flex-shrink-1 bg-light rounded py-2 px-3 ms-3';
    }

    return <div className={elementClass}>
        <div>
            <img src={props.srcAvatar}
                 className="rounded-circle me-1" alt={props.sender} width={avatarWidth}
                 height={avatarHeight}/>
            <div className="text-muted small text-nowrap mt-2">{props.time}</div>
        </div>
        <div className={messageClass}>
            <div className="font-weight-bold mb-1">{props.sender}</div>
            {props.message}
        </div>
    </div>;
}