import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-followed-by-event‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
    const partner = await seedNode(ControllerNodeType.RacingEvent)

    await expect(RacingEvent.createIsFollowedByEventRelationship(-42, partner.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createIsFollowedByEventRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createIsFollowedByEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
