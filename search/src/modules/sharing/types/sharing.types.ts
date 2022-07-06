export type BoolTrigger = (value:boolean)=>void;
export type ApplySharingToAll = (shareSettings:ShareSettings)=>void;
export type BulkSharingStatus = {
    successCount: number;
    errorCount:number;
    success:boolean;
}

export type ShareSettings = {
    publicAccess:string,
    userGroupAccesses: any[]
    userAccesses:any[]
    externalAccess:boolean
};