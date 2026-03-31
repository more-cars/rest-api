import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-video‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await GamingPlatform.createHasVideoRelationship(gamingPlatform.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(gamingPlatform.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.GamingPlatformHasVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
