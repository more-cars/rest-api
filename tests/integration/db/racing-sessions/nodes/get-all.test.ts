import {expect, test} from 'vitest'
import {deleteAllRacingSessions} from "../../../../_toolbox/dbSeeding/racing-sessions/nodes/deleteAllRacingSessions"
import {RacingSessionNode} from "../../../../../src/db/nodes/racing-sessions/types/RacingSessionNode"
import {seedRacingSessions} from "../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSessions"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-sessions/getAllNodesOfType"

test('When there are no RACING SESSIONS then an empty array should be returned', async () => {
    await deleteAllRacingSessions()

    const expectedRacingSessions: Array<RacingSessionNode> = []
    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions)
        .toEqual(expectedRacingSessions)
})

test('When RACING SESSIONS exist then all of them should be returned', async () => {
    await deleteAllRacingSessions()
    const amount = Math.ceil(Math.random() * 50)
    await seedRacingSessions(amount)

    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions.length)
        .toEqual(amount)
})
