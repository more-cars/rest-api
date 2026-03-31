import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A TRACK LAYOUT can have multiple ›has-video‹ relationships', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await TrackLayout.createHasVideoRelationship(trackLayout.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(trackLayout.properties.id, RelationshipType.TrackLayoutHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
