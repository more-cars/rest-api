import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›features-car-model-variant‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_GAME, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.RacingGameFeaturesCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const relationship = await deleteSpecificRelationship(
            racingGame.id,
            carModelVariant.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.RacingGameFeaturesCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
