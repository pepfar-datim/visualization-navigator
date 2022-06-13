"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textsWait = exports.textWait = exports.noTexts = exports.noText = exports.texts = exports.text = void 0;
const react_1 = require("@testing-library/react");
/**
 * Check if `text` is present in DOM **right now**
 *
 * @example
 * ```javascript
 * text('My awesome website')
 * ```
 * @category Text
 * */
function text(text) {
    react_1.screen.getAllByText(new RegExp(text));
}
exports.text = text;
/**
 * Check if multiple `texts` are present in DOM **right now**
 *
 * @example
 * ```javascript
 * texts(['My website','Login','Latest news'])
 * ```
 * @category Text
 * */
function texts(texts) {
    texts.forEach((textToFind) => text(textToFind));
}
exports.texts = texts;
/**
 * Check that `text` is **NOT** present in DOM
 *
 * @example
 * ```javascript
 * noText('Error')
 * ```
 * @category Text
 * */
function noText(text) {
    if (!/[A-z0-9 ]+/.test(text))
        throw new Error(`noText only supports [A-z0-9 ]. '${text}' was provided`);
    expect(react_1.screen.queryByText(new RegExp(text))).toBeNull();
}
exports.noText = noText;
/**
 * Check that **none** of the provided tests are present in dom **right now**
 *
 * @example
 * ```javascript
 * noTexts(['Error','Loading'])
 * ```
 * @category Text
 * */
function noTexts(textsToFind) {
    textsToFind.forEach(noText);
}
exports.noTexts = noTexts;
/**
 * **Wait** until `text` appears in DOM
 *
 * @example
 * ```javascript
 * await textWait('3 results found')
 * ```
 * @category Text
 * */
function textWait(text) {
    return react_1.screen.findAllByText(new RegExp(text));
}
exports.textWait = textWait;
/**
 * **Wait** until all texts appear in DOM
 *
 * @example
 * ```javascript
 * await textsWait(['3 results found','George Orwell','1984'])
 * ```
 * @category Text
 * */
async function textsWait(textsToFind, timeOut) {
    for (const text of textsToFind) {
        await react_1.screen.findAllByText(new RegExp(escapeRegExp(text)), {}, { timeout: timeOut || 5000 });
    }
}
exports.textsWait = textsWait;
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
//# sourceMappingURL=text.utils.js.map