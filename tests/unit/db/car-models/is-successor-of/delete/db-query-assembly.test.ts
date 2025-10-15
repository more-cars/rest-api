import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›is-successor-of‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // Car Model
        DbRelationship.CarModelIsSuccessorOf,
        12002003, // Car Model
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_SUCCESSOR]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
