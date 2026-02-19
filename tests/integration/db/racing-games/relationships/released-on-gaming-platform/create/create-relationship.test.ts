import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›released-on-gaming-platform‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const createdRelationship = await createRelationship(
            racingGame.id,
            gamingPlatform.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', gamingPlatform.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingGameReleasedOnGamingPlatform)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        const createdRelationship = await createRelationship(
            racingGame.id,
            -42,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
