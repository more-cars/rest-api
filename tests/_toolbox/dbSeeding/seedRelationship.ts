import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"

export enum REL {
    FORWARD = 0,
    REVERSE = 1,
}

export async function seedRelationship(
    startNodeType: NodeTypeEnum,
    endNodeType: NodeTypeEnum,
    relationshipName: DbRelationship,
    reverse: REL = 0,
) {
    const startNode = await seedNode(startNodeType)
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(
        reverse ? endNode.id : startNode.id,
        reverse ? startNode.id : endNode.id,
        relationshipName,
    )

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
