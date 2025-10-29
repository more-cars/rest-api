import {expect, test} from 'vitest'
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when the CAR MODEL does not exist', async () => {
    const relationships = await getRelationshipCollection(
        -42,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})
