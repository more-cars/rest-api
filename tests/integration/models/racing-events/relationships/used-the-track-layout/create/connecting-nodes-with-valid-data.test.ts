import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›used-the-track-layout‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    const createdRelationship = await RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventUsedTheTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
