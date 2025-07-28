import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get specific relationship" request', async () => {
    const query = getSpecificRelationshipQuery(22, DbRelationship.BrandHasCarModel, 44)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 22})-[r:HAS_CAR_MODEL]-(b {mc_id: 44})\n" +
            "RETURN r")
})
