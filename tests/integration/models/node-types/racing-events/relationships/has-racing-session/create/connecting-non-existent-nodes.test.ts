import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-racing-session‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const racingSession = await seedNode(DbNodeType.RacingSession)

    await expect(RacingEvent.createHasRacingSessionRelationship(-42, racingSession.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasRacingSessionRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
