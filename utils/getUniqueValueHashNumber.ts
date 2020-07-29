import { IEntity, HashCode } from "./definitions";

export const getUniqueValueHashNumber =  <DomainType>(entities: IEntity<DomainType>[], hashCode: HashCode<DomainType>): number => {
    const seenHashes = new Set<number>();
    entities.forEach((entity: IEntity<DomainType>) => {
        const hash = hashCode(entity);
        const seeenThisHash = seenHashes.has(hash);
        if (!seeenThisHash) {
            seenHashes.add(hash);
        }
    });

    return seenHashes.size;
}
