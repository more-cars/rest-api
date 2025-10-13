import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›belongs-to-brand‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Car Model
        DbRelationship.CarModelBelongsToBrand,
        12002003, // Brand
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:BELONGS_TO_BRAND]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
