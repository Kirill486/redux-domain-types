import { IExtendReduxAPI, ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { Factory, command, ClientSelector } from "../../utils/definitions";
import { Reducer, Store } from "redux";
import { StateControllerUnknownRootPropertyName } from "../exceptions";

export abstract class ReduxApiExtender<State> implements IExtendReduxAPI<State> {
    
    propertyTitle: string;
    plugged: boolean = false;

    constructor(propertyTitle: string) {
        this.propertyTitle = propertyTitle;
    }

    commandEntryPoint: command;
    rootSelector: ClientSelector<State>;
    
    makeReducer: Factory<ReducerMappedToProperty<State>> = () => {
        const reducer = this.innerMakeReducer();
        return {
            [this.propertyTitle]: reducer,
        };
    };
    
    plugIn = ({dispatch, getState}: Store<any>) => {
            this.commandEntryPoint = dispatch;
            this.rootSelector = () => {
                const controllerProperty = getState()[this.propertyTitle];
    
                if (controllerProperty) {
                    return controllerProperty;
                } else {
                    throw StateControllerUnknownRootPropertyName(this.propertyTitle);
                }
            }

            try {
                this.innerPlugIn();
                this.plugged = true;
            } catch(e) {
                console.log(e);
            }
    
            // goes to inner plugin
            // this.selectController = new SelectorController<State>(this.rootSelector);
            
    };
    isPlugged = () => this.plugged;

    abstract innerMakeReducer(): Reducer<State>;
    abstract innerPlugIn();
}