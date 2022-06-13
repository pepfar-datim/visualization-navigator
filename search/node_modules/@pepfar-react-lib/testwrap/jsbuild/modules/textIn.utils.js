"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTextsIn = exports.textsIn = exports.noTextIn = exports.textIn = void 0;
const react_1 = require("@testing-library/react");
/**
 * Check if `text` is present inside of element found by `id`
 *
 * @example
 * ```javascript
 * textIn('username', 'Bob')
 * ```
 * @category Text inside element
 * */
function textIn(id, text) {
    expect(react_1.screen.getByTestId(id).textContent).toMatch(new RegExp(text));
}
exports.textIn = textIn;
/**
 * Check that there is no `text` inside the element found by `id`
 *
 * @example
 * ```javascript
 * noTextIn('results', 'Bob')
 * ```
 * @category Text inside element
 * */
function noTextIn(id, text) {
    expect(react_1.screen.getByTestId(id).textContent).not.toMatch(new RegExp(text));
}
exports.noTextIn = noTextIn;
/**
 * Check that all `texts` are inside the element found by `id`
 *
 * @example
 * ```javascript
 * textsIn('results', ['Bob','Tom'])
 * ```
 * @category Text inside element
 * */
const textsIn = (id, texts) => texts.forEach((t) => textIn(id, t));
exports.textsIn = textsIn;
/**
 * Check that none of the `texts` are inside the element found by `id`
 *
 * @example
 * ```javascript
 * noTextsIn('results', ['Bob','Tom'])
 * ```
 * @category Text inside element
 * */
const noTextsIn = (id, texts) => texts.forEach((t) => noTextIn(id, t));
exports.noTextsIn = noTextsIn;
//# sourceMappingURL=textIn.utils.js.map