import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import type {RelationshipType} from "../types/RelationshipType"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"

export async function getRelationshipCollection(
    startNodeId: number,
    relationshipType: RelationshipType,
): Promise<Relationship[]> {
    const relationships: Relationship[] = []

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(getRelationshipCollectionQuery(startNodeId, relationshipType), txc)
            return result.records
        })

        records.forEach(record => {
            const startNode = record.get('a') as Node
            const neo4jRelationship = record.get('r') as Neo4jRelationship
            const endNode = record.get('b') as Node

            relationships.push(convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode))
        })

        return relationships
    } finally {
        await session.close()
    }
}

export function getRelationshipCollectionQuery(startNodeId: number, relationshipType: RelationshipType) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'getRelationshipCollectionReversed' : 'getRelationshipCollection'
    const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
    const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)

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
