import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelNode} from "../../../../../src/models/car-models/types/CarModelNode"
import {seedCarModels} from "../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {getAllNodesOfType} from "../../../../../src/db/nodes/car-models/getAllNodesOfType"

test('When there are no car models then an empty array should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)

    const expectedCarModels: Array<CarModelNode> = []
    const actualCarModels = await getAllNodesOfType()

    expect(actualCarModels)
        .toEqual(expectedCarModels)
})

test('When brands exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)
    const amount = Math.ceil(Math.random() * 50)
    await seedCarModels(amount)

    const actualCarModels = await getAllNodesOfType()

    expect(actualCarModels.length)
        .toEqual(amount)
})
