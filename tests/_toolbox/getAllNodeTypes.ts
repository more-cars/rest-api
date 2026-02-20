import {DbNodeType} from "../../src/db/types/DbNodeType"

export function getAllNodeTypes() {
    return Array.from(new Set(Object.values(DbNodeType) as string[])) as DbNodeType[]
}
