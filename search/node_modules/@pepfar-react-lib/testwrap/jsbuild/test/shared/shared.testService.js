"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAsyncFail = exports.toFail = void 0;
function toFail(method) {
    expect(method).toThrow();
}
exports.toFail = toFail;
async function toAsyncFail(method) {
    await expect(method).rejects.toThrow();
}
exports.toAsyncFail = toAsyncFail;
//# sourceMappingURL=shared.testService.js.map