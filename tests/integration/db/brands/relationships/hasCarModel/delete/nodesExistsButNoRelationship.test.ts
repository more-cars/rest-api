import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const brand = await seedNode('brand')
    const carModel = await seedNode('car model')

    const relationship = await deleteSpecificRelationship(
        brand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationship)
        .toBeFalsy()
})