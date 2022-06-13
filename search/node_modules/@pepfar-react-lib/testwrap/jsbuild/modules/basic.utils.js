"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.pause = void 0;
const react_1 = require("@testing-library/react");
/**
 * Pause test execution by `sec` seconds
 *
 * @example
 * ```javascript
 * await pause(0.2)
 * ```
 * @category Pause
 * */
function pause(ms) {
    return new Promise((done) => {
        setTimeout(done, ms);
    });
}
exports.pause = pause;
/**
 * Show current state of the test DOM enviroment
 *
 * @example
 * ```javascript
 * await debug()
 * ```
 * @category Render
 * */
let debug = (elt) => {
    react_1.screen.debug(elt || null, 10000000);
};
exports.debug = debug;
//# sourceMappingURL=basic.utils.js.map