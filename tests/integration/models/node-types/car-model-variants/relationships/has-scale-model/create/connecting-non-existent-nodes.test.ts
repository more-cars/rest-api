import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-scale-model‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    await expect(CarModelVariant.createHasScaleModelRelationship(-42, modelCar.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createHasScaleModelRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createHasScaleModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
