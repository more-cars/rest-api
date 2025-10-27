import {describe, expect, test} from 'vitest'
import {deleteAllRacingSessions} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/deleteAllRacingSessions"
import type {RacingSessionNode} from "../../../../../../src/models/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {seedRacingSessions} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSessions"

describe('Each page of a "get all RACING SESSION nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO racing session nodes (page=$0)', async (page) => {
        await deleteAllRacingSessions()

        const expectedNodes: Array<RacingSessionNode> = []
        const actualNodes = await RacingSession.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 racing session nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllRacingSessions()
        await seedRacingSessions(totalNodeAmount)

        const actualNodes = await RacingSession.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
