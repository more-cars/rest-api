import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›follows-event‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const partner = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingEvent.createFollowsEventRelationship(-42, partner.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createFollowsEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
