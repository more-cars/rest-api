import neo4j from "neo4j-driver"
import {RelationshipType} from "../types/RelationshipType"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<boolean> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const result = await session.executeWrite(async txc => {
        const result = await txc.run(deleteSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId, relationshipDirection))
        return result.summary.counters.containsUpdates()
    })

    await session.close()

    return result
}

export function deleteSpecificRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number, reverse: RelationshipDirection) {
    const templateName = reverse ? 'deleteSpecificRelationshipReversed' : 'deleteSpecificRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
