import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›has-brand‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Company
        DbRelationship.CompanyHasBrand,
        12002003, // Brand
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_BRAND]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
