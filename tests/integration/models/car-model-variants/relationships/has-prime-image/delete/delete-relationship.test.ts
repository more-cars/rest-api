import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        await expect(CarModelVariant.deleteHasPrimeImageRelationship(carModelVariant.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(CarModelVariant.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and IMAGE node do not exist', async () => {
        await expect(CarModelVariant.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(CarModelVariant.deleteHasPrimeImageRelationship(carModelVariant.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL_VARIANT, NodeTypeEnum.IMAGE, RelationshipType.CarModelVariantHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CarModelVariantHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteHasPrimeImageRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CarModelVariantHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
