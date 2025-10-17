import {expect, test} from 'vitest'
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"

test('cypher query is correctly assembled for "get relationships for specific node" request', async () => {
    const query = getRelationshipsForSpecificNodeQuery(66, DbRelationship.BrandHasCarModel)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 66})-[r:HAS_CAR_MODEL]-(b)\n" +
            "RETURN r, b")
})
