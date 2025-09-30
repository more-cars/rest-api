import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const company = await seedNode('company')
    const image = await seedNode('image')

    const relationship = await deleteSpecificRelationship(
        company.id,
        image.id,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationship)
        .toBeFalsy()
})