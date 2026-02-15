import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A GAMING PLATFORM can have multiple ›features-racing-game‹ relationships', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const racingGamesAmount = 3
    const racingGames = await seedNodes(NodeTypeEnum.RACING_GAME, racingGamesAmount)

    for (const racingGame of racingGames) {
        await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.id,
        DbRelationship.GamingPlatformFeaturesRacingGame,
        NodeTypeLabel.RacingGame,
    )

    expect(relationships.length)
        .toBe(racingGamesAmount)
})
