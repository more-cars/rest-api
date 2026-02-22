import {describe, expect, test} from 'vitest'
import type {CarModelNode} from "../../../../../../src/models/node-types/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Each page of a "get all CAR MODEL nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no CAR MODEL nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.CarModel)

        const expectedNodes: CarModelNode[] = []
        const actualNodes = await CarModel.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 CAR MODEL nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.CarModel)
        await seedNodes(DbNodeType.CarModel, totalNodeAmount)

        const expectedNodes = await CarModel.findAll({page})

        expect(expectedNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
