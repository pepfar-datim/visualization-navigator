export function disableWindowLocation(){
    delete window.location;
    window.location = {
        ancestorOrigins: undefined,
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        port: "",
        protocol: "",
        replace(url: string): void {
        },
        search: "",
        toString(): string {
            return "";
        },
        reload(forcedReload?: boolean): void {
        },
        assign: jest.fn()
    }
}