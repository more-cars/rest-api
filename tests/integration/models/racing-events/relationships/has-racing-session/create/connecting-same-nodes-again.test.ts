import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-racing-session‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
