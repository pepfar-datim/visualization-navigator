/**
 * Check if `text` is present in DOM **right now**
 *
 * @example
 * ```javascript
 * text('My awesome website')
 * ```
 * @category Text
 * */
export declare function text(text: string): void;
/**
 * Check if multiple `texts` are present in DOM **right now**
 *
 * @example
 * ```javascript
 * texts(['My website','Login','Latest news'])
 * ```
 * @category Text
 * */
export declare function texts(texts: string[]): void;
/**
 * Check that `text` is **NOT** present in DOM
 *
 * @example
 * ```javascript
 * noText('Error')
 * ```
 * @category Text
 * */
export declare function noText(text: string): void;
/**
 * Check that **none** of the provided tests are present in dom **right now**
 *
 * @example
 * ```javascript
 * noTexts(['Error','Loading'])
 * ```
 * @category Text
 * */
export declare function noTexts(textsToFind: string[]): void;
/**
 * **Wait** until `text` appears in DOM
 *
 * @example
 * ```javascript
 * await textWait('3 results found')
 * ```
 * @category Text
 * */
export declare function textWait(text: string): Promise<any>;
/**
 * **Wait** until all texts appear in DOM
 *
 * @example
 * ```javascript
 * await textsWait(['3 results found','George Orwell','1984'])
 * ```
 * @category Text
 * */
export declare function textsWait(textsToFind: string[], timeOut?: number): Promise<any>;
