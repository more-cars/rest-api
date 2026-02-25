import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A GAMING PLATFORM can have multiple ›features-racing-game‹ relationships', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(DbNodeType.RacingGame, racingGamesAmount)

    for (const racingGame of racingGames) {
        await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.properties.id, racingGame.properties.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.properties.id,
        RelationshipType.GamingPlatformFeaturesRacingGame,
        DbNodeType.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
