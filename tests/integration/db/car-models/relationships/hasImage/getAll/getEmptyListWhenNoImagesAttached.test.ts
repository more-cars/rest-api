import {expect, test} from 'vitest'
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('An empty list should be returned when no IMAGE is connected to the CAR MODEL', async () => {
    const carModel = await seedCarModel()

    const relationships = await getRelationshipCollection(
        carModel.id,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})
