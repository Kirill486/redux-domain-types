import { IEntityStateController } from "../../api_describtion/entityStateController";
import { HashIndex, id, IEntity, Factory, HashIndexInfo } from "../../utils/definitions";
import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import { ReduxRecordStateController, RecordDto } from "../RecordStateController/RecordStateController";
import { combineReducers } from "redux";
import { IEntityFactoryMethod, AddAccepts } from "./types";
import { AttemptToInsertDuplicateKey, AttemptToModifyRecordThatIsNotExist } from "./exceptions";
import { IndexStateController } from "../IndexStateController/IndexStateController";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { entities, hash } from "../../api_describtion/indexStateController";

export type EntityHashIndexValueMap = { [indexKey: string]: hash };

export class ReduxEntityStateController<DomainType>
extends StateControllerBlueprint<any>
implements IEntityStateController<IEntity<DomainType>> {

    static dataPrefix = 'data';
    static indexPrefix = 'index';
    public factory: Factory<IEntity<DomainType>>;
    dataController: ReduxRecordStateController<IEntity<DomainType>>
    indexes: { [indexKey: string]: HashIndexInfo<DomainType> } = {};

    get indexKeys() {
        return Object.keys(this.indexes);
    }

    get dataProperyTitle() {
        return `${this.propertyTitle}__${ReduxEntityStateController.dataPrefix}`;
    }

    getIndexProperyTitle = (indexKey: string)  => {
        return `${ReduxEntityStateController.indexPrefix}__${this.propertyTitle}__${indexKey}`;
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
            const {indexKey} = hashIndex;
            const indexStateController = new IndexStateController(this.getIndexProperyTitle(indexKey));
            const indexInfo: HashIndexInfo<DomainType> = {
                ...hashIndex,
                controller: indexStateController,
            };
            this.indexes[indexKey] = indexInfo;
        });
    }

    afterPlugIn = () => {
        this.dataController.plugIn(this.commandEntryPoint, this.getControllerProperty);
        this.indexKeys.forEach((indexKey) => {
            this.indexes[indexKey].controller.plugIn(this.commandEntryPoint, this.getControllerProperty);
        })
    }

    includes = (id: id) => {
        return this.dataController.includes(id);
    }

    extractEntityArray = (arg: AddAccepts<DomainType>) => {
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
        return entitiesToInsertArray;
    }

    addData = (toAdd: IEntity<DomainType>[]) => {
        const toInsert = toAdd.map((item) => this.makeRecordDto(item));
        const conflictKeys = toInsert.filter((item) => this.dataController.includes(item.recordKey)).map((item) => item.recordKey);
        if (conflictKeys.length === 0) {
            // Add data
            this.dataController.bulkSet(toInsert);
        } else {
            throw AttemptToInsertDuplicateKey(this.propertyTitle, conflictKeys);
        }
    }

    addIndexes = (toAdd: IEntity<DomainType>[]) => {
        this.indexKeys.forEach((indexKey) => {
            const {index, controller} = this.indexes[indexKey] as HashIndexInfo<DomainType>;
            toAdd.forEach((entity) => {
                const hash = index(entity);
                controller.add(hash, [entity.id]);
            });
        });
    }

    add = (arg?: AddAccepts<DomainType>) => {
        let entitiesToInsertArray: IEntity<DomainType>[];
        
        if (arg) {
            entitiesToInsertArray = this.extractEntityArray(arg);
        } else {
            const newEntity = this.factory();
            entitiesToInsertArray = this.extractEntityArray(newEntity);
        }
        
        this.addData(entitiesToInsertArray);
        this.addIndexes(entitiesToInsertArray);        
    };

    modifyEntity = (entity: IEntity<DomainType>) => {
        this.dataController.set(entity.id, entity);
    }

    deleteEntities = (toDelete: id[]) => {
        this.dataController.bulkDelete(toDelete);
    }

    // EntityHashIndexValueMap = { [indexKey: string]: hash };

    deleteIndexes = (entities: IEntity<DomainType>[]) => {
        this.indexKeys.forEach((indexKey) => {
            const {index, controller} = this.indexes[indexKey] as HashIndexInfo<DomainType>;
            entities.forEach((entity) => {
                const hash = index(entity);
                controller.remove(hash, [entity.id]);
            });
        });
    }
    
    makeIndexMap = (entity: IEntity<DomainType>): EntityHashIndexValueMap => {
        const result: EntityHashIndexValueMap = {};
        this.indexKeys.forEach((indexKey) => {
            const index = this.indexes[indexKey];
            result[indexKey] = index.index(entity);
        });

        return result;
    }

    modify = (entity: IEntity<Partial<DomainType>>) => {
        const recordExist = this.recordExist(entity.id);

        if (recordExist) {
            const oldEntity = this.getById(entity.id);

            const fullEntity = {
                ...oldEntity,
                ...entity,
            }

            this.modifyEntity(fullEntity);

            this.deleteIndexes([oldEntity]);

            this.addIndexes([fullEntity]);
        } else {
            throw AttemptToModifyRecordThatIsNotExist(this.propertyTitle, entity.id);
        }
    };
    delete = (id: id | id[]) => {
        let toDelete: id[];
        if (Array.isArray(id)) {
            toDelete = id;
        } else {
            toDelete = [id];
        }
        const oldEntities = toDelete.map(this.getById);

        this.deleteEntities(toDelete);
        this.deleteIndexes(oldEntities);
    };

    select: (indexKey?: string, value?: any) => null;
    query: (indexKey?: string, ...args: any[]) => [];

    makeReducerInner = () => {
        
        this.dataController = new ReduxRecordStateController<IEntity<DomainType>>(this.dataProperyTitle);
        const dataControllerReducer = this.dataController.makeReducer();
        
        const indexesReducer: ReducerMappedToProperty<any> = {};
        
        this.indexKeys.forEach((indexKey: string) => {
            const {controller} = this.indexes[indexKey] as HashIndexInfo<DomainType>;
            const indexControllerReducer = controller.makeReducerInner();
            indexesReducer[controller.propertyTitle] = indexControllerReducer;
        });        
                
        const reducer = combineReducers({
            ...dataControllerReducer,
            ...indexesReducer,
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

    recordExist = (id: id) => {
        return !!this.getById(id);
    }

    getById = (id: id) => {
        return this.dataController.getControllerProperty()[id];
    }
}
