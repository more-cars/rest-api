import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(CarModelVariant.createHasImageRelationship(carModelVariant.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModelVariant.createHasImageRelationship(carModelVariant.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
