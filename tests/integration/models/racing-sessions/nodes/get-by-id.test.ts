import {expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching a RACING SESSION that does not exist should return "false"', async () => {
    const expectedRacingSession = false
    const actualRacingSession = await RacingSession.findById(-42)

    expect(actualRacingSession)
        .toEqual(expectedRacingSession)
})

test('When the RACING SESSION exists it should be returned', async () => {
    const expectedRacingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const actualRacingSession = await RacingSession.findById(expectedRacingSession.id)

    expect(actualRacingSession)
        .toEqual(expectedRacingSession)
})
