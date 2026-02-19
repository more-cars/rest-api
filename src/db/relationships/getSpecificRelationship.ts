import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import type {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"

export async function getSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<false | Relationship> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getSpecificRelationshipQuery(startNodeId, dbRelationshipName, endNodeId, relationshipDirection))
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

export function getSpecificRelationshipQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, endNodeId: number, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getSpecificRelationshipReversed' : 'getSpecificRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
