import type {DbNodeType} from "../../../src/db/types/DbNodeType"
import type {RelationshipType} from "../../../src/db/types/RelationshipType"
import {seedNode} from "./seedNode"
import {createRelationship} from "../../../src/db/relationships/createRelationship"

export async function seedRelationship(
    startNodeType: DbNodeType,
    endNodeType: DbNodeType,
    relationshipType: RelationshipType,
) {
    const startNode = await seedNode(startNodeType)
    const endNode = await seedNode(endNodeType)
    const relationship = await createRelationship(
        startNode.properties.id,
        endNode.properties.id,
        relationshipType,
    )

    if (!relationship) {
        throw new Error('Relationship could not be created')
    }

    return relationship
}
