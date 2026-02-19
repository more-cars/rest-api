import {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {mapNeo4jRelationshipTypeToDbRelationshipType} from "./mapNeo4jRelationshipTypeToDbRelationshipType"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {Relationship} from "../types/Relationship"

export function convertNeo4jRelationshipToDbRelationship(
    dbRelationship: Neo4jRelationship,
    startNode: Node,
    endNode: Node,
) {
    const startNodeLabel = getDenamespacedNodeTypeLabel(startNode.labels[0]) as NodeTypeLabel
    const elementId = dbRelationship.elementId

    const relationshipType = mapNeo4jRelationshipTypeToDbRelationshipType(
        startNodeLabel,
        // For Neo4j the start node and end node are defined by the actual direction of the relationship.
        // For More Cars the start node and end node are defined by the order of appearance, no matter the direction of the relationship.
        // To align both philosophies the following switch is needed.
        startNode.identity === dbRelationship.start ? RelationshipDirection.FORWARD : RelationshipDirection.REVERSE,
        dbRelationship.type as RelationshipTypeNeo4j
    )

    const relationship: Relationship = {
        id: dbRelationship.properties.mc_id,
        elementId: elementId,
        type: relationshipType,
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
