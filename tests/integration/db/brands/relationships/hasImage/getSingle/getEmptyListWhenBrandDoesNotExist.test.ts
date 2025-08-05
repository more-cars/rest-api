import {expect, test} from 'vitest'
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

// The database does not perform any semantical checks, only syntax and data structures are checked.
// An ID of "-42" is a valid input and so is the relationship name.
// Returning an empty list makes the most sense in this case, instead of errors or exceptions.
test('An empty list should be returned when the BRAND does not exist', async () => {
    const relationships = await getRelationshipsForSpecificNode(
        -42,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})
