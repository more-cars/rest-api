import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING GAME can have multiple ›released-on-gaming-platform‹ relationships', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const gamingPlatformsAmount = 3
    const gamingPlatforms = await seedNodes(DbNodeType.GamingPlatform, gamingPlatformsAmount)

    for (const gamingPlatform of gamingPlatforms) {
        await RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.properties.id,
        RelationshipType.RacingGameReleasedOnGamingPlatform,
        DbNodeType.GamingPlatform,
    )

    expect(relationships.length)
        .toBe(gamingPlatformsAmount)
})
