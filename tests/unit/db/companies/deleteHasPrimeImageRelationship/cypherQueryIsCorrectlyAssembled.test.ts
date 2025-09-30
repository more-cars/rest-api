import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›has-prime-image‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Company
        DbRelationship.CompanyHasPrimeImage,
        12002003, // Image
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_PRIME_IMAGE]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
