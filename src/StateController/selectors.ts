import { ClientSelector } from "../../utils/definitions";

export class SelectorController<ControllerState> {
    
    rootSelector: ClientSelector<ControllerState>;
    
    public select: ClientSelector<any> = () => {
        const state = this.rootSelector();
    }

    constructor(
        rootSelector: ClientSelector<ControllerState>,
    ) {
        this.rootSelector = rootSelector;
    }

    
}