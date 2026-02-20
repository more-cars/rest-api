import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            image.properties.id,
            RelationshipType.RacingGameHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingGameHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            -42,
            RelationshipType.RacingGameHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
