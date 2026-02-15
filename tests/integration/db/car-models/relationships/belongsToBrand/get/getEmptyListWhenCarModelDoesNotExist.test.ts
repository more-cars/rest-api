import {expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

// The database does not perform any semantical checks, only syntax and data structures are checked.
// An ID of "-42" is a valid input and so is the relationship name.
// Returning an empty list makes the most sense in this case, instead of errors or exceptions.
test('An empty list should be returned when the CAR MODEL does not exist', async () => {
    const relationships = await getRelationshipCollection(
        -42,
        DbRelationship.BrandHasCarModel,
        NodeTypeLabel.CarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
