import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const image = await seedNode(DbNodeType.Image)

    await expect(CarModel.createHasImageRelationship(carModel.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createHasImageRelationship(carModel.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
