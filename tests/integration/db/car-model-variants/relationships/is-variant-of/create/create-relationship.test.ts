import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

describe('Creating a ›is-variant-of‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            carModelVariant.id,
            DbRelationship.CarModelVariantIsVariantOf,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelRelationship.hasVariant)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            -42,
            carModelVariant.id,
            DbRelationship.CarModelVariantIsVariantOf,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
