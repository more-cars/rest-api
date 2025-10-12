import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›has-image‹ relationship', async () => {
    const carModel = await seedCarModel()
    const image = await seedImage()

    await expect(CarModel.getSpecificHasImageRelationship(carModel.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
