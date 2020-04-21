import { EntityFabric, IEntity } from "../lib/types";
import {v4 as id} from 'uuid';

export interface IPersonEntity {
  firstName: string;
  lastName: string;
}

export const personFabric: EntityFabric<IEntity<IPersonEntity>> = () => ({
  id: id(),
  firstName: '',
  lastName: '',
});
