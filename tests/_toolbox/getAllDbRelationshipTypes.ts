import {RelationshipType} from "../../src/db/types/RelationshipType"

export function getAllDbRelationshipTypes() {
    return Array.from(new Set(Object.values(RelationshipType) as string[])) as RelationshipType[]
}
