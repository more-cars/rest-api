import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›features-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        const createdRelationship = await createRelationship(
            gamingPlatform.properties.id,
            racingGame.properties.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', gamingPlatform.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.GamingPlatformFeaturesRacingGame)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        const createdRelationship = await createRelationship(
            gamingPlatform.properties.id,
            -42,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
