import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›features-racing-game‹ relationship with nodes that do not exist', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)
    const racingGame = await seedNode(ControllerNodeType.RacingGame)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(-42, racingGame.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
