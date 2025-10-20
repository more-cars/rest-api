import {createRelationship} from "../../../src/db/relationships/createRelationship"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import {getTargetNodeTypeForRelationship} from "./getTargetNodeTypeForRelationship"
import {seedNode} from "./seedNode"

export async function seedRelationshipForNode(
    startNode: BaseNode,
    startNodeType: NodeTypeEnum,
    relationshipName: DbRelationship
) {
    const endNodeType = getTargetNodeTypeForRelationship(startNodeType, relationshipName)
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(startNode.id, endNode.id, relationshipName)

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
