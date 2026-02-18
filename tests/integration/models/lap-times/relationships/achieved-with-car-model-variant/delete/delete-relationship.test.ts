import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(lapTime.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(-42, carModelVariant.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-with-car-model-variant‹ relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(lapTime.id, carModelVariant.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›achieved-with-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.CAR_MODEL_VARIANT, RelationshipType.LapTimeAchievedWithCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteAchievedWithCarModelVariantRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
