export const StateControllerUnknownPropertyName = (propertyKey: string) => new Error(`Can not select property ${propertyKey} It does not exist`);
export const StateControllerUnknownPropertyNames = (propertyKeys: string[]) =>
new Error(
    `Can not select multiple properties: ${propertyKeys.join(' ')} /n
    They not exist`
);
export const StateControllerUnknownRootPropertyName = (propertyName: string) => new Error(`Wrong root property ${propertyName}`);

export const NoRootSelectorProvided = () => new Error('NoRootSelectorProvided');

export const UnpluggedControllerOperation = (propertyName: string) => Error(`Controller you're using for ${propertyName} is unplugged`);
