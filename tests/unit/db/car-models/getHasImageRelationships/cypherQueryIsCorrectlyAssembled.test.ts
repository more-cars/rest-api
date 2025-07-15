import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationships" request', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002002,
        DbRelationship.NodeHasImage,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_IMAGE]-(b)\n" +
            "RETURN r, b")
})
