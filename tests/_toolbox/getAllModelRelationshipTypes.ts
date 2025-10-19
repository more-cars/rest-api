import {RelationshipType} from "../../src/models/relationships/types/RelationshipType"

export function getAllModelRelationshipTypes() {
    return Array.from(new Set(Object.values(RelationshipType) as string[])) as RelationshipType[]
}
