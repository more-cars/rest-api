import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingSeriesNode} from "../../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RACING SERIES nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RACING SERIES nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)
        await seedNodes(DbNodeType.RacingSeries, totalNodeAmount)

        const actualNodes = await RacingSeries.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
