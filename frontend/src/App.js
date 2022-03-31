import React, {useState} from "react";
import './App.css';
import Header from "./common/Header";
import Footer from "./common/Footer";
import Chat from "./chat/Chat";


function App(props) {

    const [authorized, setAuthorized] = useState(false)

    return (
        <>
            <Header autorized={authorized} setAthorized={setAuthorized} />
            <Chat />
            <Footer />
        </>
    )

}

export default App;
