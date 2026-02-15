import {DbRelationshipName} from "../../src/db/types/DbRelationshipName"

export function getAllDbRelationshipNames() {
    return Array.from(new Set(Object.values(DbRelationshipName) as string[])) as DbRelationshipName[]
}
