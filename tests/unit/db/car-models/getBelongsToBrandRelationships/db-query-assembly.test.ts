import {expect, test} from 'vitest'
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationships" request', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002002, // Car Model
        DbRelationship.BrandHasCarModel,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_CAR_MODEL]-(b)\n" +
            "RETURN r, b")
})
