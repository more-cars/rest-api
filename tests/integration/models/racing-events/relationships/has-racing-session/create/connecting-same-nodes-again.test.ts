import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-racing-session‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
