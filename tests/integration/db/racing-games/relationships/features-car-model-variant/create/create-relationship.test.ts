import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›features-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            carModelVariant.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingGameFeaturesCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            -42,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
