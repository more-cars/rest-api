import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-car-model-variant‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-car-model-variant‹ relationship', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(RacingGame.deleteFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›features-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingGame, DbNodeType.CarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant)

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
