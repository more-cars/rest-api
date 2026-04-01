import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-main-video‹ relationship with valid data', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await Programme.createHasMainVideoRelationship(programme.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(programme.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ProgrammeHasMainVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
