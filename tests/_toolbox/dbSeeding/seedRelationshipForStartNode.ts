import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"

export async function seedRelationshipForStartNode(
    startNodeId: number,
    endNodeType: NodeTypeEnum,
    relationshipName: DbRelationship
) {
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(startNodeId, endNode.id, relationshipName)

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
