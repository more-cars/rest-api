import assert from "assert"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('An empty list should be returned when no IMAGE is connected to the CAR MODEL', async () => {
    const carModel = await seedCarModel()

    const relationships = await CarModel.getRelationshipsForHasImage(carModel.id)

    if (!relationships) {
        assert.fail('Car Model not found.')
    }

    expect(relationships.length)
        .toBe(0)
})
