import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›released-on-gaming-platform‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RacingGame)
    const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
