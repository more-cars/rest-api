import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›follows-event‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const partner = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingEvent.createFollowsEventRelationship(-42, partner.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createFollowsEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
