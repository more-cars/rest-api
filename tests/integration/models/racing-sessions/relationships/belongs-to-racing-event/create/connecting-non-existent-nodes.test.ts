import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-racing-event‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(ControllerNodeType.RacingSession)
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

    await expect(RacingSession.createBelongsToRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
