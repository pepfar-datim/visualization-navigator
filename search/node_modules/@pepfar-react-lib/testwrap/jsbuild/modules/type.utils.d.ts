/**
 * Type `text` into `input` element found by `id`
 *
 * @example
 * ```javascript
 * type('search', 'George Orwell')
 * ```
 * @category Type text
 * */
export declare function type(id: string, text: string): void;
/**
 * Type `text` into `input` element found by `id` and then wait to allow DOM to reflect changes
 *
 * @example
 * ```javascript
 * await typeWait('search', 'George Orwell')
 * ```
 * @category Type text
 * */
export declare function typeWait(id: string, text: string): Promise<void>;
