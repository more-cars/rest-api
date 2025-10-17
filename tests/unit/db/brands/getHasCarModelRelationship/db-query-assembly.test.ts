import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationship" request', async () => {
    const query = getSpecificRelationshipQuery(
        12002007,
        DbRelationship.BrandHasCarModel,
        12002008,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002007})-[r:HAS_CAR_MODEL]-(b {mc_id: 12002008})\n" +
            "RETURN r")
})
