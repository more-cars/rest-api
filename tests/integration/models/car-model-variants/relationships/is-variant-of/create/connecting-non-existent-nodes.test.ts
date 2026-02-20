import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-variant-of‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    await expect(CarModelVariant.createIsVariantOfRelationship(-42, carModel.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsVariantOfRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
