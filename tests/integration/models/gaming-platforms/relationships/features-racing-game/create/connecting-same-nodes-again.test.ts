import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-racing-game‹ relationship again', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.properties.id, racingGame.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.properties.id, racingGame.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
