import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all CAR MODEL nodes" request returns the correct number of nodes', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.CAR_MODEL, amount)

        const actualNodes = await CarModel.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
