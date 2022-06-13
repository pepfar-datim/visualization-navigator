"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickByCss = exports.clickByText = exports.click = void 0;
const react_1 = require("@testing-library/react");
/**
 * Click element found by `id`
 *
 * @example
 * ```javascript
 * click('nextPage')
 * ```
 * @category Click
 * */
function click(id) {
    react_1.fireEvent.click(react_1.screen.getByTestId(id));
}
exports.click = click;
/**
 * Click element found by `text`
 *
 * @example
 * ```javascript
 * clickByText('Next page')
 * ```
 * @category Click
 * */
function clickByText(text) {
    react_1.fireEvent.click(react_1.screen.getByText(text));
}
exports.clickByText = clickByText;
/**
 * Click element found by a css selector
 *
 * @example
 * ```javascript
 * clickByCss('.row1 .checkbox')
 * ```
 * @category Click
 * */
function clickByCss(css) {
    let element = document.querySelector(css);
    if (!element) {
        throw new Error(`Cannot find element by css selector: '${css}'`);
    }
    react_1.fireEvent.click(element);
}
exports.clickByCss = clickByCss;
//# sourceMappingURL=click.utils.js.map