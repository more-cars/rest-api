import {expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

// The database does not make any semantical checks.
// -42 is a valid input, the relationship name is valid.
// If it cannot find anything for a valid input it should return an empty list.
test('An empty list should be returned when the BRAND does not exist', async () => {
    const relationships = await getRelationshipCollection(
        -42,
        DbRelationship.BrandHasCarModel,
        NodeTypeLabel.CarModel,
    )

    expect(relationships.length)
        .toBe(0)
})
