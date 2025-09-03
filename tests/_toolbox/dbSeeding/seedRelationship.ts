import type {NodeType} from "../NodeType"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"

export async function seedRelationship(
    startNodeType: NodeType,
    endNodeType: NodeType,
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
