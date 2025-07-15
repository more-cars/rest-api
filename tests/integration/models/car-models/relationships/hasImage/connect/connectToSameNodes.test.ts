import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

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
