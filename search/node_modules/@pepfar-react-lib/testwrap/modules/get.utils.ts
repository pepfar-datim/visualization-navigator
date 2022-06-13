import {screen, waitFor} from "@testing-library/react";

export function get(testId:string):Element{
    return screen.getByTestId(testId);
}

export function getByText(text:string):Element{
    return screen.getByText(text);
}

export function getByCss(css:string):Element{
    return document.querySelector(css);
}

export function checkAttribute(element:Element, attr:string, value:string):void{
    expect(element.getAttribute(attr)).toBe(value);
}

export async function waitForElement(testId:string,timeout?:number):Promise<Element>{
    return await waitFor<Element>(() => screen.getByTestId(testId),{timeout: timeout||5000});
}

export function notToExist(id:string){
    expect(screen.queryByTestId(id)).not.toBeInTheDocument()
}

export function notToExistList(ids:string[]){
    ids.map(notToExist)
}