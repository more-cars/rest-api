import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-scale-model-of-car-model-variant‹ relationship again', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(ModelCar.createIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ModelCar.createIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
