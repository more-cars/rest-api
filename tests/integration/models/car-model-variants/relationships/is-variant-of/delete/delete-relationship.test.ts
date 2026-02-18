import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›is-variant-of‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(CarModelVariant.deleteIsVariantOfRelationship(carModelVariant.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModelVariant.deleteIsVariantOfRelationship(-42, carModel.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and CAR MODEL node do not exist', async () => {
        await expect(CarModelVariant.deleteIsVariantOfRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-variant-of‹ relationship', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModelVariant.deleteIsVariantOfRelationship(carModelVariant.id, carModel.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›is-variant-of‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL_VARIANT, NodeTypeEnum.CAR_MODEL, RelationshipType.CarModelVariantIsVariantOf)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelVariantIsVariantOf,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteIsVariantOfRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelVariantIsVariantOf,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
