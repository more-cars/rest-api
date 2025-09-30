import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const company = await seedNode('company')
    const brand = await seedNode('brand')

    const relationship = await deleteSpecificRelationship(
        company.id,
        brand.id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationship)
        .toBeFalsy()
})