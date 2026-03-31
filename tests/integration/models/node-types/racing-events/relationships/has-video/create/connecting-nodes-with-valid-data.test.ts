import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-video‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await RacingEvent.createHasVideoRelationship(racingEvent.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventHasVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
