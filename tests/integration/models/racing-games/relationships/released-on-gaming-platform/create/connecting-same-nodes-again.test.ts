import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›released-on-gaming-platform‹ relationship again', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
