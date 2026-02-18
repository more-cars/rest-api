import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-successor‹ relationship again', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
