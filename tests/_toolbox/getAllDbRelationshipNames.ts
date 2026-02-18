import {RelationshipTypeNeo4j} from "../../src/db/types/RelationshipTypeNeo4j"

export function getAllDbRelationshipNames() {
    return Array.from(new Set(Object.values(RelationshipTypeNeo4j) as string[])) as RelationshipTypeNeo4j[]
}
