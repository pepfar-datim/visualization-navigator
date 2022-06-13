import {fireEvent, getByText, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {debug, pause } from "./basic.utils";


/**
 * Select `value` in select element found by `id`
 *
 * @example
 * ```javascript
 * select('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */

export function select(id:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(id).childNodes[0]);
    let modal = screen.getByRole('presentation');
    fireEvent.click(within(modal).getByText(value));
    checkSelectValue(id, value);
}

export function selectById(id:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(id).childNodes[0]);
    fireEvent.click(screen.getByTestId(value));
}

/**
 * Check that select element found by `id` has value `value`
 *
 * @example
 * ```javascript
 * checkSelectValue('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */
export function checkSelectValue(id:string, value:string){
    expect(screen.getByTestId(id).textContent).toMatch(new RegExp(value));
}