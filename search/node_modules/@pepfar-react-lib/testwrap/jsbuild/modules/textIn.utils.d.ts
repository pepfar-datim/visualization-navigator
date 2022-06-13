/**
 * Check if `text` is present inside of element found by `id`
 *
 * @example
 * ```javascript
 * textIn('username', 'Bob')
 * ```
 * @category Text inside element
 * */
export declare function textIn(id: string, text: string): void;
/**
 * Check that there is no `text` inside the element found by `id`
 *
 * @example
 * ```javascript
 * noTextIn('results', 'Bob')
 * ```
 * @category Text inside element
 * */
export declare function noTextIn(id: string, text: string): void;
/**
 * Check that all `texts` are inside the element found by `id`
 *
 * @example
 * ```javascript
 * textsIn('results', ['Bob','Tom'])
 * ```
 * @category Text inside element
 * */
export declare const textsIn: (id: string, texts: string[]) => void;
/**
 * Check that none of the `texts` are inside the element found by `id`
 *
 * @example
 * ```javascript
 * noTextsIn('results', ['Bob','Tom'])
 * ```
 * @category Text inside element
 * */
export declare const noTextsIn: (id: string, texts: string[]) => void;
