import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-variant-of‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.properties.id, carModel.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.properties.id, carModel.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
