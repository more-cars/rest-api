import {expect, test} from 'vitest'
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when the CAR MODEL does not exist', async () => {
    const relationships = await getRelationshipsForSpecificNode(
        -42,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})
