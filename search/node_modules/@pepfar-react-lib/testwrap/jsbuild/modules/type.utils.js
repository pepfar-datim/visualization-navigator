"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeWait = exports.type = void 0;
const react_1 = require("@testing-library/react");
const basic_utils_1 = require("./basic.utils");
/**
 * Type `text` into `input` element found by `id`
 *
 * @example
 * ```javascript
 * type('search', 'George Orwell')
 * ```
 * @category Type text
 * */
function type(id, text) {
    react_1.fireEvent.change(react_1.screen.getByTestId(id), { target: { value: text } });
}
exports.type = type;
/**
 * Type `text` into `input` element found by `id` and then wait to allow DOM to reflect changes
 *
 * @example
 * ```javascript
 * await typeWait('search', 'George Orwell')
 * ```
 * @category Type text
 * */
async function typeWait(id, text) {
    react_1.fireEvent.change(react_1.screen.getByTestId(id), { target: { value: text } });
    await (0, basic_utils_1.pause)(1);
}
exports.typeWait = typeWait;
//# sourceMappingURL=type.utils.js.map