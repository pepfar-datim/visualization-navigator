import {render} from "@testing-library/react";
import React, {ReactElement} from "react";


export function generateClickTest(
    method:(target:string)=>void,
    methodParam:string,
    Page:({onClick})=>ReactElement<{onClick:()=>void},any>
){
    const onClick = jest.fn();
    test(`1 > Click > ${method.name}`, async ()=>{
        render(<Page onClick={onClick}/>)
        method(methodParam);
        expect(onClick).toBeCalledTimes(1);
    })
}