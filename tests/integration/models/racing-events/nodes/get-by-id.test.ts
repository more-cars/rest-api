import {expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../src/models/racing-events/types/RacingEventNode"

test('Fetching a RACING EVENT that does not exist should return "false"', async () => {
    const expectedRacingEvent = false
    const actualRacingEvent = await RacingEvent.findById(-42)

    expect(actualRacingEvent)
        .toEqual(expectedRacingEvent)
})

test('When the RACING EVENT exists it should be returned', async () => {
    const expectedRacingEvent = await seedNode(NodeTypeEnum.RACING_EVENT) as RacingEventNode
    const actualRacingEvent = await RacingEvent.findById(expectedRacingEvent.id)

    expect(actualRacingEvent)
        .toEqual(expectedRacingEvent)
})
