import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

// The database does not make any semantical checks.
// -42 is a valid input, the relationship name is valid.
// If it cannot find anything for a valid input it should return an empty list.
test('An empty list should be returned when the BRAND does not exist', async () => {
    const relationships = await getRelationshipsForSpecificNode(
        -42,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
