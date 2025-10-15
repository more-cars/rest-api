import {expect, test} from 'vitest'
import {
    getRelationshipForSpecificNodeQuery
} from "../../../../../../src/db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for fetching ›is-successor-of‹ relationship', async () => {
    const query = getRelationshipForSpecificNodeQuery(
        12002002, // Car Model
        DbRelationship.CarModelIsSuccessorOf,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_SUCCESSOR]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
