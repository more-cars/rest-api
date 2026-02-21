import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-featured-in-racing-game‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)

        await expect(CarModelVariant.deleteIsFeaturedInRacingGameRelationship(-42, racingGame.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and RACING GAME node do not exist', async () => {
        await expect(CarModelVariant.deleteIsFeaturedInRacingGameRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-featured-in-racing-game‹ relationship', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
        const racingGame = await seedNode(ControllerNodeType.RacingGame)

        await expect(CarModelVariant.deleteIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, racingGame.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-featured-in-racing-game‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.CarModelVariant, ControllerNodeType.RacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteIsFeaturedInRacingGameRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
