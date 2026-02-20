import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {SessionResultNode} from "../../../../../../src/models/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all SESSION RESULT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no SESSION RESULT nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 SESSION RESULT nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)
        await seedNodes(ControllerNodeType.SESSION_RESULT, totalNodeAmount)

        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
