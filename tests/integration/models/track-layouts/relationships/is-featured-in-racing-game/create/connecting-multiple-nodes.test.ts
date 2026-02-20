import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A TRACK LAYOUT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(ControllerNodeType.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.properties.id, racingGame.properties.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.properties.id,
        RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        DbNodeType.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
