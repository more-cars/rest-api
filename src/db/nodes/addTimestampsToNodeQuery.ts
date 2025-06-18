import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function addTimestampsToNodeQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/addTimestampsToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
