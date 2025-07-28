import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/images/Image"

test('The relationship ID should not change when creating the same relationship again', async () => {
    const image = await seedImage()
    const carModel = await seedCarModel()

    const relationshipBefore =
        await Image.createBelongsToNodeRelationship(image.id, carModel.id)
    expect(relationshipBefore)
        .not.toBe(false)

    const relationshipAfter =
        await Image.createBelongsToNodeRelationship(image.id, carModel.id)
    expect(relationshipAfter)
        .not.toBe(false)

    if (relationshipAfter && relationshipBefore) {
        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    }
})
