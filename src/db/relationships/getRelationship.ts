import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {DbNodeType} from "../types/DbNodeType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {getDriver} from "../driver"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationship(
    startNodeId: number,
    relationshipType: RelationshipType,
    endNodeType: DbNodeType,
): Promise<false | Relationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipQuery(startNodeId, relationshipType, endNodeType))
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

export function getRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeType: DbNodeType) {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const templateName = relationshipSpecs.isReverseRelationship ? 'getRelationshipReversed' : 'getRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
    const endNodeLabel = getNamespacedNodeTypeLabel(endNodeType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeLabel', endNodeLabel)
}
