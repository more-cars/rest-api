import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-video‹ relationship with valid data', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await RacingSession.createHasVideoRelationship(racingSession.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingSession.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionHasVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
