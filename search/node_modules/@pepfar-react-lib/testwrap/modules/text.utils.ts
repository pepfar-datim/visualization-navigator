import {screen} from "@testing-library/react";

/**
 * Check if `text` is present in DOM **right now**
 *
 * @example
 * ```javascript
 * text('My awesome website')
 * ```
 * @category Text
 * */
export function text(text:string):void{
    screen.getAllByText(new RegExp(text));
}

/**
 * Check if multiple `texts` are present in DOM **right now**
 *
 * @example
 * ```javascript
 * texts(['My website','Login','Latest news'])
 * ```
 * @category Text
 * */
export function texts(texts:string[]):void{
    texts.forEach((textToFind:string)=>text(textToFind));
}

/**
 * Check that `text` is **NOT** present in DOM
 *
 * @example
 * ```javascript
 * noText('Error')
 * ```
 * @category Text
 * */
export function noText(text:string):void{
    if (!/[A-z0-9 ]+/.test(text)) throw new Error(`noText only supports [A-z0-9 ]. '${text}' was provided`);
    expect(screen.queryByText(new RegExp(text))).toBeNull();
}

/**
 * Check that **none** of the provided tests are present in dom **right now**
 *
 * @example
 * ```javascript
 * noTexts(['Error','Loading'])
 * ```
 * @category Text
 * */
export function noTexts(textsToFind:string[]):void{
    textsToFind.forEach(noText);
}
/**
 * **Wait** until `text` appears in DOM
 *
 * @example
 * ```javascript
 * await textWait('3 results found')
 * ```
 * @category Text
 * */
export function textWait(text:string):Promise<any>{
    return screen.findAllByText(new RegExp(text));
}
/**
 * **Wait** until all texts appear in DOM
 *
 * @example
 * ```javascript
 * await textsWait(['3 results found','George Orwell','1984'])
 * ```
 * @category Text
 * */
export async function textsWait(textsToFind:string[],timeOut?:number):Promise<any>{
    for (const text of textsToFind){
        await screen.findAllByText(new RegExp(escapeRegExp(text)),{},{timeout:timeOut||5000})
    }
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}