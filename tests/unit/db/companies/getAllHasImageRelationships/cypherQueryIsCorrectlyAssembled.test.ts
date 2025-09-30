import {expect, test} from 'vitest'
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for fetching all ›has-image‹ relationships', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002002, // Company
        DbRelationship.CompanyHasImage,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_IMAGE]-(b)\n" +
            "RETURN r, b")
})
