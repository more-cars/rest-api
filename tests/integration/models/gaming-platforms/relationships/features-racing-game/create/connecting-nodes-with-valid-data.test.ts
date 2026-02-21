import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›features-racing-game‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    const createdRelationship = await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.properties.id, racingGame.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(gamingPlatform.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.GamingPlatformFeaturesRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
