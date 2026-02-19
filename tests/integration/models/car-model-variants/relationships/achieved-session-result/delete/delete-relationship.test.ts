import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-session-result‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(carModelVariant.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(-42, sessionResult.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and SESSION RESULT node do not exist', async () => {
        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-session-result‹ relationship', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-session-result‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL_VARIANT, NodeTypeEnum.SESSION_RESULT, RelationshipType.CarModelVariantAchievedSessionResult)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteAchievedSessionResultRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
