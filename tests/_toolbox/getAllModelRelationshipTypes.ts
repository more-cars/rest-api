import {RelType} from "../../src/models/relationships/types/RelType"

export function getAllModelRelationshipTypes() {
    return Array.from(new Set(Object.values(RelType) as string[])) as RelType[]
}
