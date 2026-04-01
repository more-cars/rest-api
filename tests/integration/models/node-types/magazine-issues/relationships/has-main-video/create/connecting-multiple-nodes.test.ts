import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE cannot have multiple ›has-main-video‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await MagazineIssue.createHasMainVideoRelationship(magazineIssue.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
