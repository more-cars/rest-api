import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-racing-session‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

    await expect(RacingEvent.createHasRacingSessionRelationship(-42, racingSession.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasRacingSessionRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
