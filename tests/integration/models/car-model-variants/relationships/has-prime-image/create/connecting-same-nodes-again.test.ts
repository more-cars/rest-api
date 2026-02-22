import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const image = await seedNode(DbNodeType.Image)

    await expect(CarModelVariant.createHasPrimeImageRelationship(carModelVariant.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createHasPrimeImageRelationship(carModelVariant.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
