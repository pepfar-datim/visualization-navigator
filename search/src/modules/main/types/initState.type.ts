export type User = {
    superUser:boolean,
    username:string;
}

export type InitState = {
    fetched:boolean;
    includeUsers: boolean,
    user: User;
}

export type DhisUser = {
    authorities: string[],
    userCredentials: {
        username:string,
    }
}