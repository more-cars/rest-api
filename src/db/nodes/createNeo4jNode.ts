import neo4j, {Node} from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {InputNodeTypeCreate} from "../types/InputNodeTypeCreate"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import type {QueryInputData} from "../types/QueryInputData"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {escapeSingleQuotes} from "./escapeSingleQuotes"

export async function createNeo4jNode(nodeType: DbNodeType, data: InputNodeTypeCreate): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const record = await session.executeWrite(async txc => {
            const queryInputData: QueryInputData = data
            const timestamp = new Date().toISOString()
            queryInputData.created_at = timestamp
            queryInputData.updated_at = timestamp

            const result = await runNeo4jQuery(createNodeQuery(nodeType, queryInputData), txc)
            return result.records[0].get('n') as Node
        })

        const elementId = record.elementId
        const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))

        return addMoreCarsIdToNode(moreCarsId, elementId)
    } finally {
        await session.close()
    }
}

export function createNodeQuery(nodeType: DbNodeType, data: QueryInputData) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedProperties(data)

    return getCypherQueryTemplate('nodes/_cypher/createNode.cypher')
        .trim()
        .replace('$label', `${nodeTypeLabel}`)
        .replace('$properties', properties)
}

function getCypherFormattedProperties(data: QueryInputData) {
    const lines: string[] = []

    for (const property in data) {
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
