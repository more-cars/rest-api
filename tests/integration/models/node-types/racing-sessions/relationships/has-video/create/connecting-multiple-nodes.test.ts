import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SESSION can have multiple ›has-video‹ relationships', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await RacingSession.createHasVideoRelationship(racingSession.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(racingSession.properties.id, RelationshipType.RacingSessionHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
