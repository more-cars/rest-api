import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"

export function getAllNodeTypes() {
    return Array.from(new Set(Object.values(Neo4jNodeType) as string[])) as Neo4jNodeType[]
}
