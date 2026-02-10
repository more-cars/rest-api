import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›features-car-model-variant‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, carModelVariant.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-car-model-variant‹ relationship', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›features-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_GAME, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.RacingGameFeaturesCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteFeaturesCarModelVariantRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
