import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING GAME can have multiple ›released-on-gaming-platform‹ relationships', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const gamingPlatformsAmount = 3
    const gamingPlatforms = await seedNodes(NodeTypeEnum.GAMING_PLATFORM, gamingPlatformsAmount)

    for (const gamingPlatform of gamingPlatforms) {
        await RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.id,
        RelationshipType.RacingGameReleasedOnGamingPlatform,
        NodeTypeLabel.GamingPlatform,
    )

    expect(relationships.length)
        .toBe(gamingPlatformsAmount)
})
