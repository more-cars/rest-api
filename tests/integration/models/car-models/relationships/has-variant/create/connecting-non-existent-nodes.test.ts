import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-variant‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(CarModel.createHasVariantRelationship(-42, carModelVariant.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasVariantRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
