import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›is-successor-of‹ relationship again', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partner = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
