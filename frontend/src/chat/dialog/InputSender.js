import React from "react";

export function InputSender(props) {

    const messageText = props.messageText
    const setMessageText = props.setMessageText
    const sendMessage = props.sendMessage

    const onChangeMessage = (e) => {
        setMessageText(e.target.value)
    }

    return <div className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
            <input type="text" value={messageText} onChange={onChangeMessage} className="form-control"
                   placeholder="Введите ваше сообщение"/>
            <button onClick={sendMessage} className="btn btn-primary">Отправить</button>
        </div>
    </div>;
}