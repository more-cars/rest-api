import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-racing-game‹ relationship again', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
