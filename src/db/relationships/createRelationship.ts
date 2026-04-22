import neo4j, {Relationship as Neo4jRelationship} from "neo4j-driver"
import {RelationshipType} from "../types/RelationshipType"
import {Relationship} from "../types/Relationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapDbRelationshipTypeToRelationshipType} from "../../specification/mapDbRelationshipTypeToRelationshipType"

export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType
): Promise<false | Relationship> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        // 1. Creating the rel in the database
        const records = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(createRelationshipQuery(startNodeId, relationshipType, endNodeId), txc)
            return result.records
        })

        if (records.length === 0) {
            await session.close()
            return false
        }

        const neo4jRelationship = records[0].get('r') as Neo4jRelationship

        // 2. Adding a custom More Cars ID for that relationship
        const elementId = neo4jRelationship.elementId
        const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
        await addMoreCarsIdToRelationship(elementId, moreCarsId)

        // 3. Adding timestamps
        const timestamp = new Date().toISOString()
        const dbRelationship = await addTimestampsToRelationship(elementId, timestamp, timestamp)

        return dbRelationship
    } finally {
        await session.close()
    }
}

export function createRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number) {
    const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
    const templateName = relationshipSpecs.isReverseRelationship ? 'createRelationshipReversed' : 'createRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
