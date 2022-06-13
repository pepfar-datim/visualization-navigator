import React from "react";
import {click} from "../../modules/click.utils";
import {generateClickTest} from "./click.testService";

function TestPage({onClick}){
    return <><button data-testid={'testIdToFind'} onClick={onClick}>Button 1</button></>
}

generateClickTest(click, 'testIdToFind',TestPage);