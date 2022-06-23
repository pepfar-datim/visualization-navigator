import {Message, MessageType} from "../../message/types/message.type";
import {BulkSharingStatus} from "../types/sharing.types";

function getText(status:BulkSharingStatus):string{
    if (status.success) return `Sharing updated on ${status.targetCount} items`
    else return `Cannot update sharing`
}

export function getBulkSharingMessage(status:BulkSharingStatus):Message{
    return {
        type: status?MessageType.success:MessageType.error,
        text: getText(status)
    }
}