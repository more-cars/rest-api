import {expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a RACING EVENT that does not exist should return "false"', async () => {
    const expectedRacingEvent = false
    const actualRacingEvent = await RacingEvent.findById(-42)

    expect(actualRacingEvent)
        .toEqual(expectedRacingEvent)
})

test('When the RACING EVENT exists it should be returned', async () => {
    const expectedRacingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const actualRacingEvent = await RacingEvent.findById(expectedRacingEvent.id)

    expect(actualRacingEvent)
        .toEqual(expectedRacingEvent)
})
