import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-event‹ relationship again', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
