import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {seedLapTimes} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTimes"

describe('Each page of a "get all LAP TIME nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO lap time nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)

        const expectedNodes: Array<LapTimeNode> = []
        const actualNodes = await LapTime.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 lap time nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)
        await seedLapTimes(totalNodeAmount)

        const actualNodes = await LapTime.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
