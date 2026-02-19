import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDriver} from "../driver"
import type {Relationship} from "../types/Relationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {mapNeo4jRelationshipTypeToDbRelationshipType} from "./mapNeo4jRelationshipTypeToDbRelationshipType"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"

export async function getRelationshipById(relationshipId: number) {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipByIdQuery(relationshipId))
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    const startNode: Node = records[0].get('a')
    const dbRelationship: Neo4jRelationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    const startNodeLabel = getDenamespacedNodeTypeLabel(startNode.labels[0]) as NodeTypeLabel

    const relationship: Relationship = {
        id: dbRelationship.properties.mc_id,
        type: mapNeo4jRelationshipTypeToDbRelationshipType(dbRelationship.type as RelationshipTypeNeo4j, startNodeLabel),
        start_node: Object.assign({}, startNode.properties, {
            id: startNode.properties.mc_id,
            created_at: startNode.properties.created_at,
            updated_at: startNode.properties.updated_at,
        }),
        end_node_id: endNode.properties.mc_id,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    }

    return relationship
}

export function getRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
