import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../../../src/models/node-types/model-cars/types/ModelCarNode"
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all MODEL CAR nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no MODEL CAR nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)

        const expectedNodes: ModelCarNode[] = []
        const actualNodes = await ModelCar.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 MODEL CAR nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)
        await seedNodes(DbNodeType.ModelCar, totalNodeAmount)

        const actualNodes = await ModelCar.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
