import {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {Relationship} from "../types/Relationship"
import {mapNeo4jRelationshipTypeToDbRelationshipType} from "./mapNeo4jRelationshipTypeToDbRelationshipType"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"

export function convertNeo4jRelationshipToDbRelationship(
    dbRelationship: Neo4jRelationship,
    startNode: Node,
    endNode: Node,
) {
    const startNodeLabel = getDenamespacedNodeTypeLabel(startNode.labels[0]) as NodeTypeLabel
    const elementId = dbRelationship.elementId

    const relationship: Relationship = {
        id: dbRelationship.properties.mc_id,
        elementId: elementId,
        type: mapNeo4jRelationshipTypeToDbRelationshipType(dbRelationship.type as RelationshipTypeNeo4j, startNodeLabel),
        start_node: Object.assign({}, startNode.properties, {
            id: startNode.properties.mc_id,
            created_at: startNode.properties.created_at,
            updated_at: startNode.properties.updated_at,
        }),
        end_node: Object.assign({}, endNode.properties, {
            id: endNode.properties.mc_id,
            created_at: endNode.properties.created_at,
            updated_at: endNode.properties.updated_at,
        }),
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    }

    return relationship
}
