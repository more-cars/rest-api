import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-scale-model-of-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(ModelCar.createIsScaleModelOfCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createIsScaleModelOfCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
