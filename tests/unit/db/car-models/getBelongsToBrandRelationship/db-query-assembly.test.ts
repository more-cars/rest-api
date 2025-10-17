import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get relationship" request', async () => {
    const query = getSpecificRelationshipQuery(
        12002002, // Brand
        DbRelationship.BrandHasCarModel,
        12002003,// Car Model
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_CAR_MODEL]-(b {mc_id: 12002003})\n" +
            "RETURN r")
})
