import neo4j, {Node} from "neo4j-driver"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import type {PropertySpecification} from "../../specification/PropertySpecification"
import {escapeSingleQuotes} from "./escapeSingleQuotes"
import type {InputNodeTypeCreate} from "../types/InputNodeTypeCreate"
import {DbNodeType} from "../types/DbNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {mapDbNodeTypeToNodeType} from "../../specification/mapDbNodeTypeToNodeType"

export async function createNeo4jNode(nodeType: DbNodeType, data: InputNodeTypeCreate): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const record = await session.executeWrite(async txc => {
            const timestamp = new Date().toISOString()
            const result = await runNeo4jQuery(createNodeQuery(nodeType, data, timestamp), txc)
            return result.records[0].get('n') as Node
        })

        const elementId = record.elementId
        const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))

        return addMoreCarsIdToNode(moreCarsId, elementId)
    } finally {
        await session.close()
    }
}

export function createNodeQuery(nodeType: DbNodeType, data: InputNodeTypeCreate, timestamp: string) {
    const nodeSpecs = getNodeTypeSpecification(mapDbNodeTypeToNodeType(nodeType))
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedPropertyList(nodeSpecs.properties, data)

    let template = getCypherQueryTemplate('nodes/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$nodeLabel', `${nodeTypeLabel}`)
        .replace('$nodeProperties', properties)
        .replaceAll('$timestamp', timestamp)

    return template
}

function getCypherFormattedPropertyList(propertySpecs: PropertySpecification[], data: InputNodeTypeCreate) {
    const lines: string[] = []

    propertySpecs.forEach((property, index) => {
        const line: string[] = []
        const indentation = '  '

        line.push(indentation)
        line.push(property.name)
        line.push(': ')
        // @ts-expect-error TS7053 TS7053
        line.push(getCypherFormattedPropertyValue(data[property.name], property))

        if (index + 1 < propertySpecs.length) {
            line.push(',')
        }

        lines.push(line.join(''))
    })

    return lines.join('\n')
}

function getCypherFormattedPropertyValue(value: string, propertySpecification: PropertySpecification) {
    if (value === undefined || value === null) {
        return 'null'
    }

    if (propertySpecification.datatype === 'string') {
        return "'" + escapeSingleQuotes(value) + "'"
    }

    return value
}
