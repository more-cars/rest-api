import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-racing-event‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingSession.createBelongsToRacingEventRelationship(-42, racingEvent.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
