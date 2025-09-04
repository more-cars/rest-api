import {createRelationship} from "../../../src/db/relationships/createRelationship"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import {seedNode} from "./seedNode"
import {getTargetNodeTypeForRelationship} from "./getTargetNodeTypeForRelationship"
import type {NodeType} from "../NodeType"

export async function seedRelationshipForNode(
    startNode: BaseNode,
    startNodeType: NodeType,
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
