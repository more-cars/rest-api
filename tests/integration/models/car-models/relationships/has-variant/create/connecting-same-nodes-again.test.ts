import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-variant‹ relationship again', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
