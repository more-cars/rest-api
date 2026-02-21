import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-racing-session‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
    const racingSession = await seedNode(ControllerNodeType.RacingSession)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.properties.id, racingSession.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.properties.id, racingSession.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
