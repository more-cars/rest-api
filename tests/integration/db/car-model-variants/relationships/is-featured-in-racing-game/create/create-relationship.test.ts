import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›is-featured-in-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const racingGame = await seedNode(DbNodeType.RacingGame)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            racingGame.properties.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelVariantIsFeaturedInRacingGame)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            -42,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
