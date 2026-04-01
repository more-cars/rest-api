import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-main-video‹ relationship with valid data', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await MagazineIssue.createHasMainVideoRelationship(magazineIssue.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineIssueHasMainVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
