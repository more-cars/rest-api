import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-variant‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModel.deleteHasVariantRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(CarModel.deleteHasVariantRelationship(-42, carModelVariant.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(CarModel.deleteHasVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-variant‹ relationship', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(CarModel.deleteHasVariantRelationship(carModel.id, carModelVariant.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL_VARIANT, RelationshipType.CarModelHasVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelHasVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasVariantRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelHasVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
