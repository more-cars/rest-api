import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CarModelNode} from "../../../../../../src/models/node-types/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A non-parametrized "get all CAR MODEL nodes" request returns the correct number of nodes', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)

        const expectedNodes: CarModelNode[] = []
        const actualNodes = await CarModel.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.CarModel, amount)

        const actualNodes = await CarModel.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
