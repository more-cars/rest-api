import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {addTimestampsToNode} from "./addTimestampsToNode"
import {getNodeSpecification} from "./getNodeSpecification"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {NodeSpecification} from "../types/NodeSpecification"
import {PropertySpecification} from "../types/PropertySpecification"

export async function createDbNode(nodeType: NodeTypeLabel, data: any): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the node in the database
    let dbNode: Node = await session.executeWrite(async txc => {
        const result = await txc.run(createNodeQuery(nodeType, data))
        return result.records[0].get('node')
    })

    // 2. Adding a custom More Cars ID for that node
    const elementId = dbNode.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    dbNode = await addMoreCarsIdToNode(elementId, moreCarsId)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbNode = await addTimestampsToNode(elementId, timestamp, timestamp)

    await session.close()

    return dbNode
}

export function createNodeQuery(nodeType: NodeTypeLabel, data: any) {
    const nodeSpecs = getNodeSpecification(nodeType)
    const properties = getCypherFormattedPropertyList(nodeSpecs, data)

    let template = getCypherQueryTemplate('nodes/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$NODE_TYPE_LABEL', nodeSpecs.label)
        .replace('$NODE_PROPERTIES', properties)

    return template
}

function getCypherFormattedPropertyList(nodeSpecs: NodeSpecification, data: any) {
    const lines: string[] = []

    nodeSpecs.properties.forEach((property, index) => {
        const line: string[] = []
        const indentation = '  '

        line.push(indentation)
        line.push(property.name)
        line.push(': ')
        line.push(getCypherFormattedPropertyValue(data[property.name], property))

        if (index + 1 < nodeSpecs.properties.length) {
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
        return "'" + value + "'"
    }

    return value
}
