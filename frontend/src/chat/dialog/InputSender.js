import React from "react";

export function InputSender(props) {

    const sendMessage = props.sendMessage

    return <div className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Введите ваше сообщение"/>
            <button onClick={sendMessage} className="btn btn-primary">Отправить</button>
        </div>
    </div>;
}