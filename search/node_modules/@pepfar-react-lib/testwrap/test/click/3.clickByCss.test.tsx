import React from "react";
import {clickByCss} from "../../modules/click.utils";
import {generateClickTest} from "./click.testService";

function TestPage({onClick}){
    return <div className="parent">
        <div><button/></div>
        <div className="target"><button onClick={onClick}>Button 1</button></div>
    </div>
}

generateClickTest(clickByCss, '.parent .target button',TestPage);