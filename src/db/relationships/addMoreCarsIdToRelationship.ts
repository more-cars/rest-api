import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {Relationship} from "../types/Relationship"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import type {RelationshipType} from "../types/RelationshipType"

export async function addMoreCarsIdToRelationship(moreCarsId: number, startNodeId: number, relType: RelationshipType, endNodeId: number): Promise<Relationship> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const record = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(addMoreCarsIdToRelationshipQuery(moreCarsId, startNodeId, relType, endNodeId), txc)
            return result.records[0]
        })

        const startNode = record.get('a') as Node
        const neo4jRelationship = record.get('r') as Neo4jRelationship
        const endNode = record.get('b') as Node

        return convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode)
    } finally {
        await session.close()
    }
}

export function addMoreCarsIdToRelationshipQuery(moreCarsId: number, startNodeId: number, relType: RelationshipType, endNodeId: number) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'addMoreCarsIdToRelationshipReversed' : 'addMoreCarsIdToRelationship'
    const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relType)
    const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
        .replace('$moreCarsId', moreCarsId.toString())

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
