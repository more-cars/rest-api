import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Trying to delete a ›features-car-model-variant‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_GAME, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.RacingGameFeaturesCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationship = await deleteSpecificRelationship(
            racingGame.id,
            carModelVariant.id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
