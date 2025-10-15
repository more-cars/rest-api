import {expect, test} from 'vitest'
import {
    getRelationshipForSpecificNodeQuery
} from "../../../../../../src/db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for fetching ›belongs-to-company‹ relationship', async () => {
    const query = getRelationshipForSpecificNodeQuery(
        12002002, // Brand
        DbRelationship.BrandBelongsToCompany,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_BRAND]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
