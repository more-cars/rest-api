import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {seedRacingSeriess} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeriess"

describe('Each page of a "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO racing series nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)

        const expectedNodes: Array<RacingSeriesNode> = []
        const actualNodes = await RacingSeries.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 racing series nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)
        await seedRacingSeriess(totalNodeAmount)

        const actualNodes = await RacingSeries.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
