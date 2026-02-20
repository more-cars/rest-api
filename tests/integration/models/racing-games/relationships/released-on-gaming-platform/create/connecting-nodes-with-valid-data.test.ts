import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›released-on-gaming-platform‹ relationship with valid data', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

    const createdRelationship = await RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(gamingPlatform.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameReleasedOnGamingPlatform)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
