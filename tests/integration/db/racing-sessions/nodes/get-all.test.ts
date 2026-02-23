import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RacingSessionNode} from "../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/racing-sessions/getAllNodesOfType"

test('When there are no RACING SESSIONS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingSession)

    const expectedRacingSessions: RacingSessionNode[] = []
    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions)
        .toEqual(expectedRacingSessions)
})

test('When RACING SESSIONS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingSession)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(DbNodeType.RacingSession, amount)

    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions.length)
        .toEqual(amount)
})
