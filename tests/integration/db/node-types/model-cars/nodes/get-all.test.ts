import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ModelCarNode} from "../../../../../../src/db/node-types/model-cars/types/ModelCarNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no MODEL CARS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ModelCar)

    const expectedModelCars: ModelCarNode[] = []
    const actualModelCars = await fetchNodesFromDb(DbNodeType.ModelCar)

    expect(actualModelCars)
        .toEqual(expectedModelCars)
})

test('When MODEL CARS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ModelCar)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.ModelCar, amount)

    const actualModelCars = await fetchNodesFromDb(DbNodeType.ModelCar)

    expect(actualModelCars.length)
        .toEqual(amount)
})
