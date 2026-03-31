import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT can have multiple ›has-video‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await RacingEvent.createHasVideoRelationship(racingEvent.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(racingEvent.properties.id, RelationshipType.RacingEventHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
