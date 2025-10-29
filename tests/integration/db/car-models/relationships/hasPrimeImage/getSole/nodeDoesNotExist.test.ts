import {expect, test} from 'vitest'
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the Car Model does not exist', async () => {
    const relationships = await getRelationshipCollection(
        -42,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(0)
})