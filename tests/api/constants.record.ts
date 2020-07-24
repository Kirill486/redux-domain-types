import { ReduxRecordStateController } from "../../src/RecordStateController/RecordStateController";
import { combineReducers, createStore } from "redux";

export interface IUserData {
    firstName: string;
    lastName: string;
}
export type DomainRewcordType = { [userId: string]: IUserData };

const RecordPropertyName = 'record123';

export const userDataFactory = (
    firstName: string,
    lastName: string,
) => ({
    firstName,
    lastName,
});

export const initializeRecordStateController = () => {
    const recordPropertyController = new ReduxRecordStateController<IUserData>(RecordPropertyName);
    return recordPropertyController;
}

export const initializeStoreWithRecordStateController = () => {
    const RecordPropertyController = initializeRecordStateController();
    const reducerMap = RecordPropertyController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    const {dispatch, getState} = store;
    RecordPropertyController.plugIn(dispatch, getState);

    return {
        store,
        controller: RecordPropertyController,
    }
}
