import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›released-on-gaming-platform‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            gamingPlatform.properties.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', gamingPlatform.properties.id)
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
        const racingGame = await seedNode(DbNodeType.RacingGame)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            -42,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
