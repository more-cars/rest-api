import assert from "assert"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('Requesting a relationship list for all IMAGEs that are connected to a CAR MODEL', async () => {
    const carModel = await seedCarModel()
    const images = await seedImages(3)

    for (const image of images) {
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    }

    const relationships = await CarModel.getRelationshipsForHasImage(carModel.id)

    if (!relationships) {
        assert.fail(`Car Model #${carModel.id} not found.`)
    }

    expect(relationships.length)
        .toBe(3)
})
