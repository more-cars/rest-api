import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../../../src/models/node-types/model-cars/types/ModelCarNode"
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all MODEL CAR nodes" request returns the correct number of nodes', () => {
    test('when there exist no MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)

        const expectedNodes: ModelCarNode[] = []
        const actualNodes = await ModelCar.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.ModelCar, amount)

        const actualNodes = await ModelCar.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
