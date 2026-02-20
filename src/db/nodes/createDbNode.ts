import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {addTimestampsToNode} from "./addTimestampsToNode"
import {getNodeSpecification} from "./getNodeSpecification"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {NodeSpecification} from "../types/NodeSpecification"
import {PropertySpecification} from "../types/PropertySpecification"
import {escapeSingleQuotes} from "./escapeSingleQuotes"
import type {InputCompanyCreate} from "./companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "./brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "./car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "./car-model-variants/types/InputCarModelVariantCreate"
import type {InputRaceTrackCreate} from "./race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "./track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "./racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "./racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "./racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "./session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "./lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "./racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "./gaming-platforms/types/InputGamingPlatformCreate"
import type {InputImageCreate} from "./images/types/InputImageCreate"
import {DbNodeType} from "../types/DbNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"

// TODO find a more elegant solution to describe the allowed input data
type InputTypes =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputCarModelVariantCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputRacingGameCreate |
    InputGamingPlatformCreate |
    InputImageCreate

export async function createDbNode(nodeType: DbNodeType, data: InputTypes): Promise<Node> {
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

export function createNodeQuery(nodeType: DbNodeType, data: InputTypes) {
    const nodeSpecs = getNodeSpecification(nodeType)
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedPropertyList(nodeSpecs, data)

    let template = getCypherQueryTemplate('nodes/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$NODE_TYPE_LABEL', nodeTypeLabel)
        .replace('$NODE_PROPERTIES', properties)

    return template
}

function getCypherFormattedPropertyList(nodeSpecs: NodeSpecification, data: InputTypes) {
    const lines: string[] = []

    nodeSpecs.properties.forEach((property, index) => {
        const line: string[] = []
        const indentation = '  '

        line.push(indentation)
        line.push(property.name)
        line.push(': ')
        // @ts-expect-error TS7053 TS7053
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
        return "'" + escapeSingleQuotes(value) + "'"
    }

    return value
}
