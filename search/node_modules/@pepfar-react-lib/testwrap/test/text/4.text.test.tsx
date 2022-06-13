import React from "react";
import {render} from "@testing-library/react";
import {noText, noTexts, text, texts} from "../../modules/text.utils";
import {toFail} from "../shared/shared.testService";

function Page(){
    return <>
        text to be found
        on the page
    </>
}

beforeEach(()=>{
    render(<Page/>)
})

test(`4 > Text`, ()=>{
    text('text to be found')
    toFail(()=>text('not to be found'));
})

test('4 > No text', ()=>{
    noText('not to be found')
    toFail(()=>noText('text to be found'))
})

test('4 > No text', ()=>{
    texts(['text', 'to', 'be', 'found'])
    toFail(()=>noTexts(['not', 'to', 'be', 'found']))
})