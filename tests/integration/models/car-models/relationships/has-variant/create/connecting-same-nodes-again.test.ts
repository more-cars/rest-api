import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-variant‹ relationship again', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    await expect(CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
