import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-car-model‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            brand.id,
            carModel.id,
            DbRelationship.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.BrandHasCarModel)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const createdRelationship = await createRelationship(
            brand.id,
            -42,
            DbRelationship.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
