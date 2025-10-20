import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Car Model does not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.deleteBelongsToBrandRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Brand does not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.deleteBelongsToBrandRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(CarModel.deleteBelongsToBrandRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})