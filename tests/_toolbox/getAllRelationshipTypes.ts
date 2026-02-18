import {RelationshipType} from "../../src/db/types/RelationshipType"

export function getAllRelationshipTypes() {
    return Array.from(new Set(Object.values(RelationshipType) as string[])) as RelationshipType[]
}
