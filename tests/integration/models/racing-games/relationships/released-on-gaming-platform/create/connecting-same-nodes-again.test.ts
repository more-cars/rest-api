import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›released-on-gaming-platform‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
