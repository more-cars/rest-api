import {expect, test} from 'vitest'
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when one of the nodes does not exist', async () => {
    const relationship = await deleteSpecificRelationship(
        -42,
        -43,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationship)
        .toBeFalsy()
})