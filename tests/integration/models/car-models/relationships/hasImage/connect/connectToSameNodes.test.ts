import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage.ts"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel.ts"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel.ts"

test('The relationship ID should not change when creating the same relationship again', async () => {
    const carModel = await seedCarModel()
    const image = await seedImage()

    const relationshipBefore =
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    expect(relationshipBefore)
        .not.toBe(false)

    const relationshipAfter =
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    expect(relationshipAfter)
        .not.toBe(false)

    if (relationshipAfter && relationshipBefore) {
        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    }
})
