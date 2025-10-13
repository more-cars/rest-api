import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›belongs-to-node‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Image
        DbRelationship.ImageBelongsToNode,
        12002003, // Node
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_IMAGE]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
