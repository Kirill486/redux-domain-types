import { CsudActions, IAction, id, EntityFabric, IEntityState } from "./types";
import { ActionCreator } from "redux";

export class EntityController<Entity> {
  static readonly prefix = 'entity';
  private domainPrefix: string;
  public readonly createActionType: string;
  public readonly setActionType: string;
  public readonly updateActionType: string;
  public readonly deleteActionType: string;
  
  public getEmptyEntity: EntityFabric<Entity>;

  public create: ActionCreator<IAction<undefined>> = () => ({
    type: this.createActionType,
    payload: undefined,
  });

  public set: ActionCreator<IAction<IEntityState<Entity>>> =
  (entities: IEntityState<Entity>) => ({
    type: this.setActionType,
    payload: entities,
  });

  public update: ActionCreator<IAction<Entity>> =
  (entity: Entity) => ({
    type: this.updateActionType,
    payload: entity,
  });

  public delete: ActionCreator<IAction<string>> =
  (id: id) => ({
    type: this.deleteActionType,
    payload: id,
  });

  constructor(
    prefix: string,
    emptyEntityFabric: EntityFabric<Entity>,
  ) {
    this.domainPrefix = prefix;

    this.createActionType = `${EntityController.prefix}/${this.domainPrefix}/${CsudActions.CREATE}`;
    this.setActionType = `${EntityController.prefix}/${this.domainPrefix}/${CsudActions.SET}`;
    this.updateActionType = `${EntityController.prefix}/${this.domainPrefix}/${CsudActions.UPDATE}`;
    this.deleteActionType = `${EntityController.prefix}/${this.domainPrefix}/${CsudActions.DELETE}`;

    this.getEmptyEntity = emptyEntityFabric;
  }
}