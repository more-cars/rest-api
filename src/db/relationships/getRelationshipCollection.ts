import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDriver} from "../driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {DbNodeType} from "../types/DbNodeType"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import type {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"

export async function getRelationshipCollection(
    startNodeId: number,
    relationshipType: RelationshipType,
    endNodeType?: DbNodeType,
): Promise<Relationship[]> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const relationships: Relationship[] = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipCollectionQuery(startNodeId, dbRelationshipName, relationshipDirection, endNodeType))
        return result.records
    })

    await session.close()

    records.forEach(record => {
        const startNode: Node = record.get('a')
        const dbRelationship: Neo4jRelationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push(convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode))
    })

    return relationships
}

export function getRelationshipCollectionQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, reverse: RelationshipDirection, endNodeType?: DbNodeType) {
    const templateName = reverse ? 'getRelationshipCollectionReversed' : 'getRelationshipCollection'

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)

    if (endNodeType) {
        template = template.replace('$endNodeLabel', getNamespacedNodeTypeLabel(endNodeType))
    } else {
        template = template.replace(':$endNodeLabel', '')
    }

    return template
}
