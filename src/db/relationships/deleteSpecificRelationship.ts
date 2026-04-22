import neo4j from "neo4j-driver"
import {RelationshipType} from "../types/RelationshipType"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"

export async function deleteSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<boolean> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        return await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(deleteSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId), txc)
            return result.summary.counters.containsUpdates()
        })
    } finally {
        await session.close()
    }
}

export function deleteSpecificRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'deleteSpecificRelationshipReversed' : 'deleteSpecificRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
