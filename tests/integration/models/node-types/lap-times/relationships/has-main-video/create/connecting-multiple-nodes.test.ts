import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A LAP TIME cannot have multiple ›has-main-video‹ relationships', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await LapTime.createHasMainVideoRelationship(lapTime.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(lapTime.properties.id, RelationshipType.LapTimeHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
