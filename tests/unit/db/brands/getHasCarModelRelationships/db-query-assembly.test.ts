import {expect, test} from 'vitest'
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"

test('cypher query is correctly assembled for "get relationships" request', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002007,
        DbRelationship.BrandHasCarModel,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002007})-[r:HAS_CAR_MODEL]-(b)\n" +
            "RETURN r, b")
})
