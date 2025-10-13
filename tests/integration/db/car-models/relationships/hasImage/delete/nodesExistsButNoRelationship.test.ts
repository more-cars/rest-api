import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const carModel = await seedNode('car model')
    const image = await seedNode('image')

    const relationship = await deleteSpecificRelationship(
        carModel.id,
        image.id,
        DbRelationship.CarModelHasImage,
    )

    expect(relationship)
        .toBeFalsy()
})