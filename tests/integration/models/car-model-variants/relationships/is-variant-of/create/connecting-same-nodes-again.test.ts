import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-variant-of‹ relationship again', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
