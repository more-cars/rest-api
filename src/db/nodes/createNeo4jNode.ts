import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {addTimestampsToNode} from "./addTimestampsToNode"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import type {PropertySpecification} from "../../specification/PropertySpecification"
import {escapeSingleQuotes} from "./escapeSingleQuotes"
import type {InputNodeTypeCreate} from "../types/InputNodeTypeCreate"
import {DbNodeType} from "../types/DbNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {mapDbNodeTypeToNodeType} from "../../specification/mapDbNodeTypeToNodeType"

export async function createNeo4jNode(nodeType: DbNodeType, data: InputNodeTypeCreate): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the node in the database
    let neo4jNode: Node = await session.executeWrite(async txc => {
        const result = await txc.run(createNodeQuery(nodeType, data))
        return result.records[0].get('node')
    })

    // 2. Adding a custom More Cars ID for that node
    const elementId = neo4jNode.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    await addMoreCarsIdToNode(elementId, moreCarsId)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    neo4jNode = await addTimestampsToNode(elementId, timestamp, timestamp)

    await session.close()

    return neo4jNode
}

export function createNodeQuery(nodeType: DbNodeType, data: InputNodeTypeCreate) {
    const nodeSpecs = getNodeTypeSpecification(mapDbNodeTypeToNodeType(nodeType))
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedPropertyList(nodeSpecs.properties, data)

    let template = getCypherQueryTemplate('nodes/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$NODE_TYPE_LABEL', nodeTypeLabel)
        .replace('$NODE_PROPERTIES', properties)

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
