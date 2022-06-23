import {Message, MessageType} from "../types/message.type";
import {Alert} from "@mui/material";
import "../style/messageBox.css"
import {Trigger} from "../../shared/types/shared.types";

export function MessageBox({message,closeMessage}:{message?:Message,closeMessage:Trigger}){
    if (!message) return null;
    const {type,text} = message;
    return <div className={'messageBoxRoot'}>
        <Alert severity={type} variant={'filled'} onClose={closeMessage}>{text}</Alert>
    </div>
}