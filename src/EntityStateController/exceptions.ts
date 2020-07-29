import { id } from "../../utils/definitions";

export const AttemptToInsertDuplicateKey =
    (propertyKey: string, conflictKeys: string[]) =>
    new Error(`Attempt to insert is state property ${propertyKey} duplicate key ${conflictKeys.join(' ')}`);

export const  AttemptToModifyRecordThatIsNotExist = (propertyKey: string, entityId: id) =>
    new Error(`Attempt to modify record that is not exist propertyKey: ${propertyKey} entityId: ${entityId}`);