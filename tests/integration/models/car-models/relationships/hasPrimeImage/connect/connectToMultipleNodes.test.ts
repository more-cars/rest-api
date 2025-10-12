import {expect, test} from 'vitest'
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›has-prime-image‹ relationships', async () => {
    const carModel = await seedCarModel()
    const imagesAmount = 3
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await CarModel.createHasPrimeImageRelationship(carModel.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(carModel.id, DbRelationship.CarModelHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
