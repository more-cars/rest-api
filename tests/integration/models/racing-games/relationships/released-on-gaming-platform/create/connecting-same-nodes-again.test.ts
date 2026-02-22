import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›released-on-gaming-platform‹ relationship again', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
