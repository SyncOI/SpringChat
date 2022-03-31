export function InputSender() {
    return <div className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Введите ваше сообщение"/>
            <button className="btn btn-primary">Отправить</button>
        </div>
    </div>;
}