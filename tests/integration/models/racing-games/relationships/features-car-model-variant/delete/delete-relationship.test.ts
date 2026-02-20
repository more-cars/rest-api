import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-car-model-variant‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, carModelVariant.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-car-model-variant‹ relationship', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›features-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_GAME, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.RacingGameFeaturesCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteFeaturesCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
