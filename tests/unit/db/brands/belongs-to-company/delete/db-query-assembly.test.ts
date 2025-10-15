import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›belongs-to-company‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Brand
        DbRelationship.BrandBelongsToCompany,
        12002003, // Company
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:BELONGS_TO_COMPANY]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
