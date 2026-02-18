import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›follows-event‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const partner = await seedNode(NodeTypeEnum.RACING_EVENT)

    const createdRelationship = await RacingEvent.createFollowsEventRelationship(racingEvent.id, partner.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.id)
        .toEqual(partner.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventFollowsEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
