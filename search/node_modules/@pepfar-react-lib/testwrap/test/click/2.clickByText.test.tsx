import React from "react";
import {clickByText} from "../../modules/click.utils";
import {generateClickTest} from "./click.testService";

function TestPage({onClick}){
    return <><button onClick={onClick}>Text to find</button></>
}

generateClickTest(clickByText, 'Text to find',TestPage);