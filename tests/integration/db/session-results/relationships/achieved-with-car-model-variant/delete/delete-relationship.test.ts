import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›achieved-with-car-model-variant‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.SESSION_RESULT, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.SessionResultAchievedWithCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const relationship = await deleteSpecificRelationship(
            sessionResult.id,
            carModelVariant.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
