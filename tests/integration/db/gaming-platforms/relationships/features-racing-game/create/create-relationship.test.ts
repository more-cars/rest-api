import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›features-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        const createdRelationship = await createRelationship(
            gamingPlatform.id,
            racingGame.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', gamingPlatform.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.GamingPlatformFeaturesRacingGame)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const createdRelationship = await createRelationship(
            gamingPlatform.id,
            -42,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
