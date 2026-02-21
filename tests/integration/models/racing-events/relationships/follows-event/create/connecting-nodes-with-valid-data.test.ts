import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›follows-event‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partner = await seedNode(ControllerNodeType.RACING_EVENT)

    const createdRelationship = await RacingEvent.createFollowsEventRelationship(racingEvent.properties.id, partner.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(partner.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventFollowsEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
