import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        await expect(SessionResult.deleteAchievedWithCarModelVariantRelationship(sessionResult.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(SessionResult.deleteAchievedWithCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(SessionResult.deleteAchievedWithCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-with-car-model-variant‹ relationship', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(SessionResult.deleteAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-with-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.SESSION_RESULT, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.SessionResultAchievedWithCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteAchievedWithCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
