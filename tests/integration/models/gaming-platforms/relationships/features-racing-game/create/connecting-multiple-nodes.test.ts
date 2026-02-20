import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A GAMING PLATFORM can have multiple ›features-racing-game‹ relationships', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(ControllerNodeType.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.id,
        RelationshipType.GamingPlatformFeaturesRacingGame,
        DbNodeType.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
