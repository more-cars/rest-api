import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-scale-model‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    await expect(CarModelVariant.createHasScaleModelRelationship(carModelVariant.properties.id, modelCar.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createHasScaleModelRelationship(carModelVariant.properties.id, modelCar.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
