import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SERIES cannot have multiple ›has-main-video‹ relationships', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await RacingSeries.createHasMainVideoRelationship(racingSeries.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(racingSeries.properties.id, RelationshipType.RacingSeriesHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
