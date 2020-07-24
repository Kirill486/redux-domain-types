import { IEntityStateController } from "../../api_describtion/entityStateController";
import { HashIndex, id, IEntity, Factory } from "../../utils/definitions";
import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import { ReduxRecordStateController, RecordDto } from "../RecordStateController/RecordStateController";
import { combineReducers } from "redux";
import { IEntityFactoryMethod, AddAccepts } from "./types";
import { AttemptToInsertDuplicateKey } from "./exceptions";

export class ReduxEntityStateController<DomainType>
extends StateControllerBlueprint<any>
implements IEntityStateController<IEntity<DomainType>> {

    static dataPrefix = 'data';
    public factory: Factory<IEntity<DomainType>>;
    dataController: ReduxRecordStateController<IEntity<DomainType>>
    indexes = {};

    get indexKeys() {
        return Object.keys(this.indexes);
    }

    get dataProperyTitle() {
        return `${this.propertyTitle}__${ReduxEntityStateController.dataPrefix}`;
    }
    
    constructor(
        propertyTitle: string,
        factoryMethod: IEntityFactoryMethod<IEntity<DomainType>>,
        indexes: Array<HashIndex<DomainType>>,
    ) {
        super(propertyTitle);

        const {factory} = factoryMethod;
        this.factory = factory;

        indexes.forEach((hashIndex) => {
            const {indexKey, index: IndexFunction} = hashIndex;
            this.indexes[indexKey] =- IndexFunction;
        });
    }

    afterPlugIn = () => {
        this.dataController.plugIn(this.commandEntryPoint, this.getControllerProperty);
    }

    includes: () => false;

    add = (arg?: AddAccepts<DomainType>) => {
        if (arg) {
            let entitiesToInsertArray: Array<IEntity<DomainType>> = [];
            const isArray = Array.isArray(arg);

            if (isArray) {
                entitiesToInsertArray = (arg as DomainType[]).map((item) => {
                    return this.makeEntity(item);
                });                
            } else {
                const entity: IEntity<DomainType> = this.makeEntity(arg as DomainType);
                entitiesToInsertArray = [entity];
            }
            
            // Checks if record exist
            const toInsert = entitiesToInsertArray.map((item) => this.makeRecordDto(item));
            
            const greenToInsert = toInsert.every((item) => {
                // all records must be new
                return !this.dataController.includes(item.recordKey);
            })

            if (greenToInsert) {
                this.dataController.bulkSet(toInsert);
            } else {
                throw AttemptToInsertDuplicateKey(this.propertyTitle);
            }
            
            

        } else {
            const newEntity = this.factory();
            this.dataController.set(newEntity.id, newEntity);
        }
    };
    modify = (entity: IEntity<Partial<DomainType>>) => {
        const recordExist = this.recordExist(entity.id);
        const fullEntity = {
            ...this.factory(),
            ...entity,
        }
        if (recordExist) {
            this.dataController.set(entity.id, fullEntity);
        }
    };
    delete: (id: id | id[]) => void;

    select: (indexKey?: string, value?: any) => null;
    query: (indexKey?: string, ...args: any[]) => [];

    makeReducerInner = () => {
        
        this.dataController = new ReduxRecordStateController<IEntity<DomainType>>(this.dataProperyTitle);
        const dataControllerReducer = this.dataController.makeReducer();
        
        // Looks like we need an Index State Controller
        
        // const indexReducers = this.IndexKeys.map((indexKey) => {
        //     const correspondingFunction = this.indexes[indexKey];
        //     const indexReducer = 
        // });
        
        
        const reducer = combineReducers({
            ...dataControllerReducer,
        });
        return reducer;
    };

    makeEntity = (entity: DomainType | IEntity<DomainType>): IEntity<DomainType> => {
        const newEntity = this.factory();
        return {
            ...newEntity,
            ...entity,
        }
    }

    makeRecordDto = (entity: IEntity<DomainType>): RecordDto<IEntity<DomainType>> => {
        return {
            recordKey: entity.id,
            record: entity,
        }
    }

    recordExist = (id: string) => {
        return this.dataController.getControllerProperty();
    }
}
