import {Message, MessageType} from "../../message/types/message.type";
import {BulkSharingStatus} from "../types/sharing.types";

function getText(status:BulkSharingStatus):string{
    if (status.success) return `Sharing updated on ${status.successCount} items`
    else return `Succeeded with ${status.successCount} items, but failed with ${status.errorCount} items, probably because they are not owned by you`
}

export function getBulkSharingMessage(status:BulkSharingStatus):Message{
    return {
        type: status.success?MessageType.success:MessageType.error,
        text: getText(status)
    }
}