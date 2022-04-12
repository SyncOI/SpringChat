import {DialogHeader} from "./DialogHeader";
import {InputSender} from "./InputSender";
import {Message} from "./Message";
import {useEffect, useState} from "react";
import * as SockJS from 'sockjs-client';
import React from "react";
import {Stomp} from "@stomp/stompjs";
import {getMessage} from "@testing-library/jest-dom/dist/utils";
import alert from "bootstrap/js/src/alert";

function Dialog(props) {

    const [stompClient, setStompClient] = useState(null);

    const uri = props.uri
    const roomInfo = props.roomInfo
    const currentDialog = props.currentDialog
    const [messages, setMessages] = useState([])

    const recipientAvatar = (Object.keys(roomInfo).length !== 0 ? "https://bootdey.com/img/Content/avatar/avatar" + roomInfo.recipient.avatarId + ".png" : "");
    const senderAvatar = (Object.keys(roomInfo).length !== 0 ? "https://bootdey.com/img/Content/avatar/avatar" + roomInfo.sender.avatarId + ".png" : "")

    const sendMessage = (e) => {
        e.preventDefault()
        let message = {
            senderId: 1,
            recipientId: 2,
            senderName: "K",
            recipientName: "J",
            content: "Hello",
            timestamp: new Date(),
        };
        stompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    useEffect(() => {
        if (currentDialog === "") {
            return
        }

        fetch(uri + "/message/" + currentDialog, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setMessages(data)
        })

    }, [currentDialog])

    useEffect(() => {
        if (currentDialog === "") {
            return
        }

        const getMessage = (info) => {
          console.log(JSON.parse(info))
        }

        let socket = new SockJS('http://localhost:8080/ws');
        const _stompClient = Stomp.over(socket)
        _stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            _stompClient.subscribe('/user/' + currentDialog + '/queue/messages',
                getMessage);
        });

        setStompClient(_stompClient)
    }, [currentDialog])

    if (currentDialog === "") {
        return null
    }

    return (
        <div className="col-12 col-lg-7 col-xl-9">
            <DialogHeader
                avatarSrc={recipientAvatar}
                name={Object.keys(roomInfo).length !== 0 ? roomInfo.recipient.username : ""} typing={false}/>

            <div className="position-relative">
                <div id="chat-messages" className="chat-messages p-4">

                    {messages.map(value => (
                        <Message key={value.id}
                                 direction={value.senderId === roomInfo.senderId ? "out" : "in"}
                                 sender={value.senderId === roomInfo.senderId ? value.senderName : value.recipientName}
                                 time="14:33"
                                 srcAvatar={value.senderId === roomInfo.senderId ? senderAvatar : recipientAvatar}
                                 message={value.content} />
                    ))}

                    {/*<Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lorem ipsum dolor sit amet, vis erat deniq"/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message="Sit meis deleniti eue docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>


                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="L, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message=" meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>


                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lorem ipsum dolor sit amet, vis eraesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat is deleniti eu, pri vidit meliore docendi ut, an eum erat ananimal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lorem ipsu dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar={recipientAvatar}
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar={senderAvatar}
                             message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>*/}


                </div>
            </div>

            <InputSender sendMessage={sendMessage}/>

        </div>
    )
}

export default Dialog