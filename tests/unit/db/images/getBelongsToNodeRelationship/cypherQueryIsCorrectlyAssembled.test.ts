import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationship" request', async () => {
    const query = getSpecificRelationshipQuery(
        12002001,
        DbRelationship.NodeHasImage,
        12002002,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002001})-[r:HAS_IMAGE]-(b {mc_id: 12002002})\n" +
            "RETURN r")
})
