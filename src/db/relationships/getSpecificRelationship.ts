import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {getDriver} from "../driver"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<false | Relationship> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId))
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

export function getSpecificRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number) {
    const relationshipSpecs = getRelationshipTypeSpecification(relationshipType)
    const templateName = relationshipSpecs.isReverseRelationship ? 'getSpecificRelationshipReversed' : 'getSpecificRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
