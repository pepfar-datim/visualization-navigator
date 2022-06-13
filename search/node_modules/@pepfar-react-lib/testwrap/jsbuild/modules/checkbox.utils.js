"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckboxValue = exports.checkCheckbox = void 0;
const react_1 = require("@testing-library/react");
/**
 * Check that checkbox found by `id` is `checked` (or unchecked for `false`)
 *
 * @example
 * ```javascript
 * checkboxValue('includeExpired', true)
 * ```
 * @category Checkbox
 * */
function checkCheckbox(id, checked) {
    // @ts-ignore
    expect(react_1.screen.getByTestId(id).checked).toBe(checked);
}
exports.checkCheckbox = checkCheckbox;
function getCheckboxValue(id) {
    // @ts-ignore
    return react_1.screen.getByTestId(id).checked;
}
exports.getCheckboxValue = getCheckboxValue;
//# sourceMappingURL=checkbox.utils.js.map