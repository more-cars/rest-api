import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {LapTimeNode} from "../../../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all LAP TIME nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no LAP TIME nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.LapTime)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 LAP TIME nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.LapTime)
        await seedNodes(DbNodeType.LapTime, totalNodeAmount)

        const actualNodes = await LapTime.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
