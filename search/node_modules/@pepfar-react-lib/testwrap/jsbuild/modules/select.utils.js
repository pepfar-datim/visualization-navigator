"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSelectValue = exports.selectById = exports.select = void 0;
const react_1 = require("@testing-library/react");
/**
 * Select `value` in select element found by `id`
 *
 * @example
 * ```javascript
 * select('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */
function select(id, value) {
    react_1.fireEvent.mouseDown(react_1.screen.getByTestId(id).childNodes[0]);
    let modal = react_1.screen.getByRole('presentation');
    react_1.fireEvent.click((0, react_1.within)(modal).getByText(value));
    checkSelectValue(id, value);
}
exports.select = select;
function selectById(id, value) {
    react_1.fireEvent.mouseDown(react_1.screen.getByTestId(id).childNodes[0]);
    react_1.fireEvent.click(react_1.screen.getByTestId(value));
}
exports.selectById = selectById;
/**
 * Check that select element found by `id` has value `value`
 *
 * @example
 * ```javascript
 * checkSelectValue('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */
function checkSelectValue(id, value) {
    expect(react_1.screen.getByTestId(id).textContent).toMatch(new RegExp(value));
}
exports.checkSelectValue = checkSelectValue;
//# sourceMappingURL=select.utils.js.map