import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›released-on-gaming-platform‹ relationship with nodes that do not exist', async () => {
    const racingGame = await seedNode(ControllerNodeType.RacingGame)
    const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(-42, gamingPlatform.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
