import type {NodeType} from "../NodeType"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"

export async function seedRelationshipForStartNode(
    startNodeId: number,
    endNodeType: NodeType,
    relationshipName: DbRelationship
) {
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(startNodeId, endNode.id, relationshipName)

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
