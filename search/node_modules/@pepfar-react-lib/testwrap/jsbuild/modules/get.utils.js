"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForElement = exports.checkAttribute = exports.getByCss = exports.getByText = exports.get = void 0;
const react_1 = require("@testing-library/react");
function get(testId) {
    return react_1.screen.getByTestId(testId);
}
exports.get = get;
function getByText(text) {
    return react_1.screen.getByText(text);
}
exports.getByText = getByText;
function getByCss(css) {
    return document.querySelector(css);
}
exports.getByCss = getByCss;
function checkAttribute(element, attr, value) {
    expect(element.getAttribute(attr)).toBe(value);
}
exports.checkAttribute = checkAttribute;
async function waitForElement(testId, timeout) {
    return await (0, react_1.waitFor)(() => react_1.screen.getByTestId(testId), { timeout: timeout || 5000 });
}
exports.waitForElement = waitForElement;
//# sourceMappingURL=get.utils.js.map