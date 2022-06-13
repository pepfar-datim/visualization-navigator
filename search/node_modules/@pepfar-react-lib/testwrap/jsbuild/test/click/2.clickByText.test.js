"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const click_utils_1 = require("../../modules/click.utils");
const click_testService_1 = require("./click.testService");
function TestPage({ onClick }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("button", { onClick: onClick }, "Text to find"));
}
(0, click_testService_1.generateClickTest)(click_utils_1.clickByText, 'Text to find', TestPage);
//# sourceMappingURL=2.clickByText.test.js.map