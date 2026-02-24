import {DbNodeType} from "../../src/db/types/DbNodeType"

export function getAllDbNodeTypes() {
    return Array.from(new Set(Object.values(DbNodeType) as string[])) as DbNodeType[]
}
