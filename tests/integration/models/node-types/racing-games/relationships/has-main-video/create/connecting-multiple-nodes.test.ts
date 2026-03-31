import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING GAME cannot have multiple ›has-main-video‹ relationships', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await RacingGame.createHasMainVideoRelationship(racingGame.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(racingGame.properties.id, RelationshipType.RacingGameHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
