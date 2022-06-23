export enum MessageType {
    success='success',
    error='error'
}
export type Message = {
    text:string,
    type:MessageType,
}