import assert from "assert"
import {seedImages} from "../../../../../../dbSeeding/images/nodes/seedImages.ts"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel.ts"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel.ts"

test('A CAR MODEL can have multiple IMAGEs attached to it', async () => {
    const carModel = await seedCarModel()
    const imagesAmount = 7
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    }

    const relationships = await CarModel.getRelationshipsForHasImage(carModel.id)

    if (!relationships) {
        assert.fail(`Car Model #${carModel.id} not found.`)
    }

    expect(relationships.length)
        .toBe(imagesAmount)
})
