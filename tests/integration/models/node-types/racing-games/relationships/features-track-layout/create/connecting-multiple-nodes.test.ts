import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING GAME can have multiple ›features-track-layout‹ relationships', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(DbNodeType.TrackLayout, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.properties.id,
        RelationshipType.RacingGameFeaturesTrackLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
