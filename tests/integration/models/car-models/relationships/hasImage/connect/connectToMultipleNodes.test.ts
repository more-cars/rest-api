import {expect, test} from 'vitest'
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('A CAR MODEL can have multiple ›has-image‹ relationships', async () => {
    const carModel = await seedCarModel()
    const imagesAmount = 3
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    }

    const relationships = await CarModel.getAllHasImageRelationships(carModel.id)

    expect(relationships.length)
        .toBe(imagesAmount)
})
