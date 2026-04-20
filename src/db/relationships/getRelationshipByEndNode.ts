import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {Relationship} from "../types/Relationship"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"

export async function getRelationshipByEndNode(
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<false | Relationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await runNeo4jQuery(getRelationshipQuery(endNodeId, relationshipType), txc)
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    const startNode: Node = records[0].get('a')
    const dbRelationship: Neo4jRelationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    return convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode)
}

export function getRelationshipQuery(endNodeId: number, relationshipType: RelationshipType) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'getRelationshipByEndNodeReversed' : 'getRelationshipByEndNode'
    const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
    const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())

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