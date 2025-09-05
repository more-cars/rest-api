import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const carModel = await seedNode('car model')
    const image = await seedNode('image')

    const relationship = await getSpecificRelationship(
        carModel.id,
        image.id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationship)
        .toBeFalsy()
})