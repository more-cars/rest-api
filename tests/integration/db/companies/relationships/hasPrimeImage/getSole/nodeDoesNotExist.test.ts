import {expect, test} from 'vitest'
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the Company does not exist', async () => {
    const relationships = await getRelationshipsForSpecificNode(
        -42,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(0)
})