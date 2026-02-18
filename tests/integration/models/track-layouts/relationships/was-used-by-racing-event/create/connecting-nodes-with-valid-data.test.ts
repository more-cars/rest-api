import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›was-used-by-racing-event‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    const createdRelationship = await TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id)

    expect(createdRelationship.origin.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.id)
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
