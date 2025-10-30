import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariantRelationship} from "../../../../../../../src/models/car-model-variants/types/CarModelVariantRelationship"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            image.id,
            DbRelationship.CarModelVariantHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelVariantRelationship.hasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            -42,
            DbRelationship.CarModelVariantHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
