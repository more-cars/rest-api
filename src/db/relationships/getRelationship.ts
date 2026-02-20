import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {DbNodeType} from "../types/DbNodeType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"

export async function getRelationship(
    startNodeId: number,
    relationshipType: RelationshipType,
    endNodeType: DbNodeType,
): Promise<false | Relationship> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipQuery(startNodeId, dbRelationshipName, endNodeType, relationshipDirection))
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

export function getRelationshipQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, endNodeLabel: DbNodeType, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getRelationshipReversed' : 'getRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeLabel', getNamespacedNodeTypeLabel(endNodeLabel))
}
