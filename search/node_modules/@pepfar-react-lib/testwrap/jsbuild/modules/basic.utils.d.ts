/**
 * Pause test execution by `sec` seconds
 *
 * @example
 * ```javascript
 * await pause(0.2)
 * ```
 * @category Pause
 * */
export declare function pause(ms: number): Promise<void>;
/**
 * Show current state of the test DOM enviroment
 *
 * @example
 * ```javascript
 * await debug()
 * ```
 * @category Render
 * */
export declare let debug: (elt?: Element) => void;
