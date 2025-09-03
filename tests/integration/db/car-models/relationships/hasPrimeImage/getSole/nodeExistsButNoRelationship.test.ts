import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const carModel = await seedCarModel()

    const relationships = await getRelationshipsForSpecificNode(
        carModel.id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(0)
})