import {DbRelationship} from "../../src/db/types/DbRelationship"

export function getAllRelationshipTypes() {
    return Array.from(new Set(Object.values(DbRelationship) as string[])) as DbRelationship[]
}
