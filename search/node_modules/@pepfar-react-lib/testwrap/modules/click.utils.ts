import {fireEvent, screen} from "@testing-library/react";

/**
 * Click element found by `id`
 *
 * @example
 * ```javascript
 * click('nextPage')
 * ```
 * @category Click
 * */
export function click(id:string){
    fireEvent.click(screen.getByTestId(id));
}

/**
 * Click element found by `text`
 *
 * @example
 * ```javascript
 * clickByText('Next page')
 * ```
 * @category Click
 * */
export function clickByText(text:string){
    fireEvent.click(screen.getByText(text));
}

/**
 * Click element found by a css selector
 *
 * @example
 * ```javascript
 * clickByCss('.row1 .checkbox')
 * ```
 * @category Click
 * */
export function clickByCss(css:string){
    let element = document.querySelector(css);
    if (!element) {
        throw new Error(`Cannot find element by css selector: '${css}'`);
    }
    fireEvent.click(element);
}

export function clickByRole(role:string){
    fireEvent.click(screen.getByRole(role));
}