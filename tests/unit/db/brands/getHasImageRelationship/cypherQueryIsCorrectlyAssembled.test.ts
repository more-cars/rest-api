import {expect, test} from 'vitest'
import {getRelationshipForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationship" request', async () => {
    const query = getRelationshipForSpecificNodeQuery(
        12002001,
        DbRelationship.NodeHasImage,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002001})-[r:HAS_IMAGE]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
