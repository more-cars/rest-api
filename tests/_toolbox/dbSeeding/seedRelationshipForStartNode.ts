import type {ControllerNodeType} from "../../../src/controllers/nodes/types/ControllerNodeType"
import type {RelationshipType} from "../../../src/db/types/RelationshipType"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"

export async function seedRelationshipForStartNode(
    startNodeId: number,
    endNodeType: ControllerNodeType,
    relationshipType: RelationshipType,
) {
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(startNodeId, endNode.id, relationshipType)

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
