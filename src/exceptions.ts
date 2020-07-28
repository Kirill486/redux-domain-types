export const NotImplementedYetException = () => new Error('This is not implemented yet');

// State Controller

export const StateControllerUnknownPropertyName = (propertyKey: string) => new Error(`Can not select property ${propertyKey} It does not exist`);
export const StateControllerUnknownPropertyNames = (propertyKeys: string[]) =>
new Error(
    `Can not select multiple properties: ${propertyKeys.join(' ')} /n
    They not exist`
);
export const StateControllerUnknownRootPropertyName = (propertyName: string) => new Error(`Wrong root property ${propertyName}`);

export const NoRootSelectorProvided = () => new Error('NoRootSelectorProvided');

export const UnpluggedControllerOperation = (propertyName: string) => Error(`Controller you're using for ${propertyName} is unplugged`);

// Record State controller

export const RecordValueCannotBeUndefined = (recordKey: string) => new Error(`Attempt to set ${recordKey} to undefined. Use delete instead`);
export const RecordKeyCannotBeUndefined = () => new Error(`Cannot set to undefined key`);
export const KeyDoesNotExistToDelete = (recordKeys: string[]) => new Error(`Records with keys ${recordKeys.join(' ')} does not exist. Cannot select`);

export const KeyYouReTryingToReachDoesNotExist = (recordKey: string) => new Error(`Record with key ${recordKey} does not exist. Cannot select`);

// Index State controller

export const AttemptToDeleteHashThatIsNotPresent = (hash: number) => new Error(`Attempt to delete from hash that does dot exist ${hash}`)