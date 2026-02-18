import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›released-on-gaming-platform‹ relationship with valid data', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

    const createdRelationship = await RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.destination.id)
        .toEqual(gamingPlatform.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameReleasedOnGamingPlatform)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
