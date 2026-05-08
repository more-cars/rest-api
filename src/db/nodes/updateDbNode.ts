import neo4j, {Node} from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import type {QueryInputData} from "../types/QueryInputData"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel, getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {escapeSingleQuotes} from "./escapeSingleQuotes"

export async function updateDbNode(nodeType: DbNodeType, id: number, data: QueryInputData): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const node = await session.executeWrite(async txc => {
            const inputData = {...data}
            inputData.updated_at = new Date().toISOString()

            const result = await runNeo4jQuery(updateNodeQuery(nodeType, id, inputData), txc)
            return result.records[0].get('n') as Node
        })

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function updateNodeQuery(nodeType: DbNodeType, id: number, data: QueryInputData) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedProperties(data)

    return getCypherQueryTemplate('nodes/_cypher/updateNode.cypher')
        .trim()
        .replace('$label', nodeTypeLabel)
        .replace('$id', id.toString())
        .replace('$properties', properties)
}

function getCypherFormattedProperties(data: QueryInputData) {
    const lines: string[] = []

    for (const property in data) {
        if (data[property] === undefined) {
            continue
        }

        const line: string[] = []
        const indentation = '  '

        line.push(indentation)
        line.push(property)
        line.push(': ')

        if (data[property] === null) {
            line.push('null')
        }

        switch (typeof data[property]) {
            case 'string':
                line.push(`'${escapeSingleQuotes(data[property])}'`)
                break
            case 'number':
            case 'boolean':
                line.push(`${data[property]}`)
        }

        lines.push(line.join(''))
    }

    return lines.join(',\n')
}
