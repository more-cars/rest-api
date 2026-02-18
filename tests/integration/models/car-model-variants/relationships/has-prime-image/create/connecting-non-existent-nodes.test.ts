import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(CarModelVariant.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createHasPrimeImageRelationship(carModelVariant.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
