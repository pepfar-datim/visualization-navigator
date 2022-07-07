import {Trigger} from "../../shared/types/shared.types";

export function registerEnterKey(triggerSearch:Trigger){
    document.addEventListener('keydown', ({key}) => {
        if (key==='Enter') triggerSearch()
    });
}