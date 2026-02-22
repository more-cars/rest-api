import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›follows-event‹ relationship again', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const partner = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.properties.id, partner.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.properties.id, partner.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
