import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-brand‹ relationship again', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
