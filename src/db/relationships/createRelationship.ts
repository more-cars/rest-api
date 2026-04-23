import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {RelationshipType} from "../types/RelationshipType"
import {Relationship} from "../types/Relationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"

export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType
): Promise<false | Relationship> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const records = await session.executeWrite(async txc => {
            const timestamp = new Date().toISOString()
            const result = await runNeo4jQuery(createRelationshipQuery(startNodeId, relationshipType, endNodeId, timestamp), txc)
            return result.records
        })

        if (records.length === 0) {
            return false
        }

        const startNode = records[0].get('a') as Node
        const neo4jRelationship = records[0].get('r') as Neo4jRelationship
        const endNode = records[0].get('b') as Node

        const elementId = neo4jRelationship.elementId
        const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
        const dbRel = convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode)

        return addMoreCarsIdToRelationship(moreCarsId, dbRel.start_node.properties.id, dbRel.type, dbRel.end_node.properties.id)
    } finally {
        await session.close()
    }
}

export function createRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number, timestamp: string) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'createRelationshipReversed' : 'createRelationship'
    const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
    const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
        .replaceAll('$timestamp', timestamp)

    if (startNodeType) {
        template = template.replace('$startNodeLabel', getNamespacedNodeTypeLabel(startNodeType))
    } else {
        template = template.replace(':$startNodeLabel', '')
    }

    if (endNodeType) {
        template = template.replace('$endNodeLabel', getNamespacedNodeTypeLabel(endNodeType))
    } else {
        template = template.replace(':$endNodeLabel', '')
    }

    return template
}
