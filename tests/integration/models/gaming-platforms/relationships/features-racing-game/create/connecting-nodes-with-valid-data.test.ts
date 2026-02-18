import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›features-racing-game‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    const createdRelationship = await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id)

    expect(createdRelationship.origin.id)
        .toEqual(gamingPlatform.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.GamingPlatformFeaturesRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
