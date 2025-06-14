import {findRelationships} from "../../../../../../../src/db/findRelationships"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

// The database does not perform any semantical checks, only syntax and data structures are checked.
// An ID of "-42" is a valid input and so is the relationship name.
// Returning an empty list makes the most sense in this case, instead of errors or exceptions.
test('An empty list should be returned when the CAR MODEL does not exist', async () => {
    const relationships = await findRelationships(
        -42,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
