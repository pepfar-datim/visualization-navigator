"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_2 = require("@testing-library/react");
const text_utils_1 = require("../../modules/text.utils");
const shared_testService_1 = require("../shared/shared.testService");
const pageDelay = 500;
const textContent = 'content delivered';
function Page() {
    let [content, setContent] = (0, react_1.useState)(false);
    if (!content)
        setTimeout(() => setContent(true), pageDelay);
    if (!content)
        return react_1.default.createElement(react_1.default.Fragment, null, "Waiting for content");
    else
        return react_1.default.createElement(react_1.default.Fragment, null, textContent);
}
test(`5 > Text wait`, async () => {
    (0, react_2.render)(react_1.default.createElement(Page, null));
    (0, text_utils_1.text)('Waiting for content');
    (0, text_utils_1.noText)(textContent);
    await (0, text_utils_1.textWait)(textContent);
    (0, text_utils_1.text)(textContent);
});
test(`5 > Text wait should fail`, async () => {
    (0, react_2.render)(react_1.default.createElement(Page, null));
    (0, text_utils_1.text)('Waiting for content');
    await (0, shared_testService_1.toAsyncFail)(async () => await (0, text_utils_1.textWait)('unexpected content'));
});
test(`5 > Texts wait `, async () => {
    (0, react_2.render)(react_1.default.createElement(Page, null));
    await (0, text_utils_1.textsWait)(['content', 'delivered']);
});
test(`5 > Texts wait should fail`, async () => {
    (0, react_2.render)(react_1.default.createElement(Page, null));
    let statement = async () => await (0, text_utils_1.textsWait)(['content', 'delivered', 'now']);
    await (0, shared_testService_1.toAsyncFail)(statement);
});
//# sourceMappingURL=5.textWait.test.js.map