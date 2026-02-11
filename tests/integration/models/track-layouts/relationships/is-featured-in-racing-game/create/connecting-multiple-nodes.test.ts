import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A TRACK LAYOUT can have multiple ›is-featured-in-racing-game‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(NodeTypeEnum.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id)
    }

    const relationships = await getRelationshipCollection(trackLayout.id, DbRelationship.TrackLayoutIsFeaturedInRacingGame)

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
