import { Store } from "redux";

export const printState = (store: Store<any>) => {
    const dataRepressentation = JSON.stringify(store.getState(), undefined, 2);
    console.log(dataRepressentation);
}
