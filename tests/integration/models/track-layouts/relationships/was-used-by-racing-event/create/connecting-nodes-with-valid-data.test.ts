import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›was-used-by-racing-event‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    const createdRelationship = await TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutWasUsedByRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
