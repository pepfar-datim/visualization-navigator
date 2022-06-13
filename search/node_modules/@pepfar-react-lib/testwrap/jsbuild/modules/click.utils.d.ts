/**
 * Click element found by `id`
 *
 * @example
 * ```javascript
 * click('nextPage')
 * ```
 * @category Click
 * */
export declare function click(id: string): void;
/**
 * Click element found by `text`
 *
 * @example
 * ```javascript
 * clickByText('Next page')
 * ```
 * @category Click
 * */
export declare function clickByText(text: string): void;
/**
 * Click element found by a css selector
 *
 * @example
 * ```javascript
 * clickByCss('.row1 .checkbox')
 * ```
 * @category Click
 * */
export declare function clickByCss(css: string): void;
