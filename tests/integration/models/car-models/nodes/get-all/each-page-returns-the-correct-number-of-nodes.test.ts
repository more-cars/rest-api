import {describe, expect, test} from 'vitest'
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Each page of a "get all CAR MODEL nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO car model nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 car model nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)
        await seedNodes(NodeTypeEnum.CAR_MODEL, totalNodeAmount)

        const expectedNodes = await CarModel.findAll({page})

        expect(expectedNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
