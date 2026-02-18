import neo4j from "neo4j-driver"
import {DbRelationship} from "../types/DbRelationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: DbRelationship,
): Promise<boolean> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const result = await session.executeWrite(async txc => {
        const result = await txc.run(deleteSpecificRelationshipQuery(startNodeId, dbRelationshipName, endNodeId, relationshipDirection))
        return result.summary.counters.containsUpdates()
    })

    await session.close()

    return result
}

export function deleteSpecificRelationshipQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, endNodeId: number, reverse: RelationshipDirection) {
    const templateName = reverse ? 'deleteSpecificRelationshipReversed' : 'deleteSpecificRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
