import {DialogHeader} from "./DialogHeader";
import {InputSender} from "./InputSender";
import {Message} from "./Message";
import {useState} from "react";

function Dialog(props) {

    const currentDialog = props.currentDialog
    const [messages, setMessages] = useState([])

    if (currentDialog === "") {
        return null
    }

    return (
        <div className="col-12 col-lg-7 col-xl-9">
            <DialogHeader name="Sharon Lessman" typing={true}/>

            <div className="position-relative">
                <div id="chat-messages" className="chat-messages p-4">

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lorem ipsum dolor sit amet, vis erat deniq"/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message="Sit meis deleniti eue docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>


                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="L, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message=" meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>


                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lorem ipsum dolor sit amet, vis eraesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat is deleniti eu, pri vidit meliore docendi ut, an eum erat ananimal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lorem ipsu dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>

                    <Message direction="in" sender="Sharon Lessman" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar3.png"
                             message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."/>

                    <Message direction="out" sender="You" time="14:33"
                             srcAvatar="https://bootdey.com/img/Content/avatar/avatar1.png"
                             message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."/>


                </div>
            </div>

            <InputSender/>

        </div>
    )
}

export default Dialog