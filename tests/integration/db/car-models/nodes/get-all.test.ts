import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelNode} from "../../../../../src/models/node-types/car-models/types/CarModelNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/car-models/getAllNodesOfType"

test('When there are no CAR MODELS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.CarModel)

    const expectedCarModels: CarModelNode[] = []
    const actualCarModels = await getAllNodesOfType()

    expect(actualCarModels)
        .toEqual(expectedCarModels)
})

test('When CAR MODELS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.CarModel)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.CarModel, amount)

    const actualCarModels = await getAllNodesOfType()

    expect(actualCarModels.length)
        .toEqual(amount)
})
