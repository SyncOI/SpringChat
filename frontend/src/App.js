import React, {Component, useEffect, useState} from "react";
import './App.css';
import Header from "./common/Header";
import Footer from "./common/Footer";
import Chat from "./chat/Chat";

const uri = "http://localhost:8080/api"

function App() {

    const [authorized, setAuthorized] = useState(false)
    const [name, setName] = useState("")

    useEffect(() => {
        let jwtToken = localStorage.getItem("token")

        fetch(uri + "/user", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        }).then((response) => {
            if (response.status === 401) {
                jwtToken = ""
                localStorage.removeItem("token")
                return Promise.reject()
            } else {
                return response.json()

            }
        }).then((data) => {
            setAuthorized(true)
            setName(data.username)
        }, (data) => {
        })
    }, [authorized])

    return (
        <>
            <Header authorized={authorized}
                    setAthorized={setAuthorized}
                    name={name}
                    uri={uri}/>
            <Chat authorized={authorized}
                  uri={uri}/>
            <Footer/>
        </>
    )

}

export default App;
