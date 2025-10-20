import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"

export async function seedRelationship(
    startNodeType: NodeTypeEnum,
    endNodeType: NodeTypeEnum,
    relationshipName: DbRelationship
) {
    const startNode = await seedNode(startNodeType)
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(startNode.id, endNode.id, relationshipName)

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
