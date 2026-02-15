import {DbRelationship} from "../types/DbRelationship"
import {BaseRelationship} from "../types/BaseRelationship"
import {createDbRelationship} from "./createDbRelationship"
import {mapNeo4jRelationshipToDbRelationship} from "./mapNeo4jRelationshipToDbRelationship"

export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: DbRelationship
): Promise<false | BaseRelationship> {
    const relationship = await createDbRelationship(startNodeId, endNodeId, relationshipType)

    if (!relationship) {
        return false
    }

    return mapNeo4jRelationshipToDbRelationship(startNodeId, endNodeId, relationshipType, relationship)
}
