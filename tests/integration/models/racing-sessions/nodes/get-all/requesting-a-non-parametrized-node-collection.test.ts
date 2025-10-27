import {describe, expect, test} from 'vitest'
import {deleteAllRacingSessions} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/deleteAllRacingSessions"
import type {RacingSessionNode} from "../../../../../../src/models/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {seedRacingSessions} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSessions"

describe('A non-parametrized "get all RACING SESSION nodes" request returns the correct number of nodes', () => {
    test('when there exist NO racing session nodes', async () => {
        await deleteAllRacingSessions()

        const expectedNodes: Array<RacingSessionNode> = []
        const actualNodes = await RacingSession.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing session nodes', async () => {
        await deleteAllRacingSessions()
        const amount = Math.ceil(Math.random() * 20)
        await seedRacingSessions(amount)

        const actualNodes = await RacingSession.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
