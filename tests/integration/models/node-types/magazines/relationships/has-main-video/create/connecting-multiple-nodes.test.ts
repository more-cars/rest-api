import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE cannot have multiple ›has-main-video‹ relationships', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Magazine.createHasMainVideoRelationship(magazine.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(magazine.properties.id, RelationshipType.MagazineHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
