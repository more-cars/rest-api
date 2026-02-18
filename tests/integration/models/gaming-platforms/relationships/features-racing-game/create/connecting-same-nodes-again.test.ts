import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›features-racing-game‹ relationship again', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
