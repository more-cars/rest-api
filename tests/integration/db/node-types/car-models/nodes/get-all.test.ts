import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {CarModelNode} from "../../../../../../src/models/node-types/car-models/types/CarModelNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no CAR MODELS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.CarModel)

    const expectedCarModels: CarModelNode[] = []
    const actualCarModels = await fetchNodesFromDb(DbNodeType.CarModel)

    expect(actualCarModels)
        .toEqual(expectedCarModels)
})

test('When CAR MODELS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.CarModel)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.CarModel, amount)

    const actualCarModels = await fetchNodesFromDb(DbNodeType.CarModel)

    expect(actualCarModels.length)
        .toEqual(amount)
})
