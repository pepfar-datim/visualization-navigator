"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableWindowLocation = void 0;
function disableWindowLocation() {
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
        replace(url) {
        },
        search: "",
        toString() {
            return "";
        },
        reload(forcedReload) {
        },
        assign: jest.fn()
    };
}
exports.disableWindowLocation = disableWindowLocation;
//# sourceMappingURL=disableWindowLocation.utils.js.map