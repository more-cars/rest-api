import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSessionNode} from "../../../../../../src/models/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all RACING SESSION nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO racing session nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)

        const expectedNodes: Array<RacingSessionNode> = []
        const actualNodes = await RacingSession.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 racing session nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)
        await seedNodes(NodeTypeEnum.RACING_SESSION, totalNodeAmount)

        const actualNodes = await RacingSession.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
