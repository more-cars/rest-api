import {expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a RACING SESSION that does not exist should return "false"', async () => {
    const expectedRacingSession = false
    const actualRacingSession = await RacingSession.findById(-42)

    expect(actualRacingSession)
        .toEqual(expectedRacingSession)
})

test('When the RACING SESSION exists it should be returned', async () => {
    const expectedRacingSession = await seedNode(DbNodeType.RacingSession)
    const actualRacingSession = await RacingSession.findById(expectedRacingSession.properties.id)

    expect(actualRacingSession.attributes)
        .toEqual(expectedRacingSession.properties)
})
