import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-followed-by-event‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partner = await seedNode(ControllerNodeType.RACING_EVENT)

    const createdRelationship = await RacingEvent.createIsFollowedByEventRelationship(racingEvent.id, partner.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(partner.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventIsFollowedByEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
