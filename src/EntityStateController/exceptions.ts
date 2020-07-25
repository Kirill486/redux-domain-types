export const AttemptToInsertDuplicateKey =
    (propertyKey: string, conflictKeys: string[]) =>
    new Error(`Attempt to insert is state property ${propertyKey} duplicate key ${conflictKeys.join(' ')}`);