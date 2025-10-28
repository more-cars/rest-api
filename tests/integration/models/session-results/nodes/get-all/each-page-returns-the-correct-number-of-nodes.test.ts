import {describe, expect, test} from 'vitest'
import {deleteAllSessionResults} from "../../../../../_toolbox/dbSeeding/session-results/nodes/deleteAllSessionResults"
import type {SessionResultNode} from "../../../../../../src/models/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {seedSessionResults} from "../../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResults"

describe('Each page of a "get all SESSION RESULT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO session result nodes (page=$0)', async (page) => {
        await deleteAllSessionResults()

        const expectedNodes: Array<SessionResultNode> = []
        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 session result nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllSessionResults()
        await seedSessionResults(totalNodeAmount)

        const actualNodes = await SessionResult.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
