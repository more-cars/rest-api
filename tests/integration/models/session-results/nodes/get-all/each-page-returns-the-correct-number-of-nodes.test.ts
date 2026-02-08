import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {SessionResultNode} from "../../../../../../src/models/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all SESSION RESULT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO session result nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)

        const expectedNodes: Array<SessionResultNode> = []
        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 session result nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)
        await seedNodes(NodeTypeEnum.SESSION_RESULT, totalNodeAmount)

        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
