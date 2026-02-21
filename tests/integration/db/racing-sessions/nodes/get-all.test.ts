import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSessionNode} from "../../../../../src/db/nodes/racing-sessions/types/RacingSessionNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-sessions/getAllNodesOfType"

test('When there are no RACING SESSIONS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RacingSession)

    const expectedRacingSessions: RacingSessionNode[] = []
    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions)
        .toEqual(expectedRacingSessions)
})

test('When RACING SESSIONS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RacingSession)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.RacingSession, amount)

    const actualRacingSessions = await getAllNodesOfType()

    expect(actualRacingSessions.length)
        .toEqual(amount)
})
