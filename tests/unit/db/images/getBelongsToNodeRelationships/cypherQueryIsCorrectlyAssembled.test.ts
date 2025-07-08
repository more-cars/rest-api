import {
    getRelationshipsForSpecificNodeQuery
} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode.ts"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship.ts"

test('cypher query is correctly assembled for "get relationship" request', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002001,
        DbRelationship.ImageBelongsToNode,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002001})-[r:BELONGS_TO_NODE]-(b)\n" +
            "RETURN r, b")
})
