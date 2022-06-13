"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClickTest = void 0;
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
function generateClickTest(method, methodParam, Page) {
    const onClick = jest.fn();
    test(`1 > Click > ${method.name}`, async () => {
        (0, react_1.render)(react_2.default.createElement(Page, { onClick: onClick }));
        method(methodParam);
        expect(onClick).toBeCalledTimes(1);
    });
}
exports.generateClickTest = generateClickTest;
//# sourceMappingURL=click.testService.js.map