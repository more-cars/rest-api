import {DbRelationship} from "../types/DbRelationship"
import {BaseRelationship} from "../types/BaseRelationship"
import {createDbRelationship} from "./createDbRelationship.ts"
import {mapDbRelationshipToBaseRelationship} from "./mapDbRelationshipToBaseRelationship.ts"

/**
 * Creating a relationship between the two given nodes.
 * When the given nodes don't exist or the relationship name is invalid then the creation will be aborted.
 */
export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship
): Promise<false | BaseRelationship> {
    const relationship = await createDbRelationship(startNodeId, endNodeId, relationshipName)

    if (!relationship) {
        return false
    }

    return mapDbRelationshipToBaseRelationship(startNodeId, endNodeId, relationshipName, relationship)
}
