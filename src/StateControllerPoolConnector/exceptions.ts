export const PoolConnectorCanNotFindRecordById = (id: string, propertyTitle: string, properiesVisited: string[]) =>
    new Error(`Pool Connector can not find record by id: ${id} propertyTitle: ${propertyTitle} properties visited: ${properiesVisited.join(' ')}`);

export const ControllerPoolAttemptToGetUnknownStateProperty = (propertyTitle: string) =>
    new Error(`Controller Pool attempt to get unknown State property: ${propertyTitle} Use GetById to query EntityState`);

export const PoolConnectorAttemptToUseDisconnected = () =>
    new Error(`Pool Connector Attempt to Use Disconnected`);