import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes exist, but have no relationship', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(CarModel.deleteBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
